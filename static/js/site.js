(() => {
  const root = document.documentElement;

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    /* Theme --------------------------------------------------- */
    const themeButtons = [...document.querySelectorAll('.theme-toggle')];

    function updateThemeControls() {
      const isDark = root.classList.contains('dark');
      themeButtons.forEach((button) => {
        const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
      });
    }

    function setTheme(isDark) {
      root.classList.toggle('dark', isDark);
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {}
      updateThemeControls();
    }

    updateThemeControls();
    themeButtons.forEach((button) => {
      button.addEventListener('click', () => setTheme(!root.classList.contains('dark')));
    });

    /* Mobile navigation -------------------------------------- */
    const menuButton = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    function setMenu(open) {
      if (!menuButton || !mobileNav) return;
      mobileNav.toggleAttribute('hidden', !open);
      menuButton.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    if (menuButton && mobileNav) {
      menuButton.addEventListener('click', () => setMenu(mobileNav.hasAttribute('hidden')));
      mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileNav.hasAttribute('hidden')) {
          setMenu(false);
          menuButton.focus();
        }
      });
    }

    /* Back to top -------------------------------------------- */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      const updateBackToTop = () => {
        backToTop.classList.toggle('is-visible', window.scrollY > 360);
      };
      updateBackToTop();
      window.addEventListener('scroll', updateBackToTop, { passive: true });
      backToTop.addEventListener('click', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }

    /* Search ------------------------------------------------- */
    const dialog = document.getElementById('search-dialog');
    const input = document.getElementById('site-search-input');
    const results = document.getElementById('search-results');
    const searchButtons = [...document.querySelectorAll('.search-toggle')];
    const closeButtons = [...document.querySelectorAll('[data-search-close]')];
    const indexNode = document.getElementById('site-search-index');

    let searchIndex = [];
    if (indexNode) {
      try {
        searchIndex = JSON.parse(indexNode.textContent || '[]');
      } catch (e) {
        searchIndex = [];
      }
    }

    let lastFocus = null;

    function escapeHTML(value) {
      return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    function normalize(value) {
      return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function scorePage(page, terms) {
      const title = normalize(page.title);
      const summary = normalize(page.summary);
      const content = normalize(page.content);
      let score = 0;

      for (const term of terms) {
        if (title === term) score += 30;
        if (title.startsWith(term)) score += 14;
        if (title.includes(term)) score += 10;
        if (summary.includes(term)) score += 4;
        if (content.includes(term)) score += 1;
        if (!title.includes(term) && !summary.includes(term) && !content.includes(term)) return -1;
      }
      return score;
    }

    function renderResults(query) {
      if (!results) return;
      const terms = normalize(query).split(' ').filter(Boolean);

      if (!terms.length) {
        results.innerHTML = '<p class="search-empty">Type to search across the site.</p>';
        return;
      }

      const matches = searchIndex
        .map((page) => ({ page, score: scorePage(page, terms) }))
        .filter((item) => item.score >= 0)
        .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
        .slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<p class="search-empty">No matching pages found.</p>';
        return;
      }

      results.innerHTML = matches
        .map(({ page }) => {
          const summary = page.summary ? `<p>${escapeHTML(page.summary)}</p>` : '';
          return `<a class="search-result" href="${escapeHTML(page.url)}"><strong>${escapeHTML(page.title)}</strong>${summary}</a>`;
        })
        .join('');
    }

    function openSearch() {
      if (!dialog || !input) return;
      lastFocus = document.activeElement;
      dialog.hidden = false;
      document.body.classList.add('search-open');
      renderResults(input.value);
      requestAnimationFrame(() => input.focus());
    }

    function closeSearch() {
      if (!dialog) return;
      dialog.hidden = true;
      document.body.classList.remove('search-open');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    searchButtons.forEach((button) => button.addEventListener('click', openSearch));
    closeButtons.forEach((button) => button.addEventListener('click', closeSearch));
    if (input) input.addEventListener('input', () => renderResults(input.value));

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        if (dialog && !dialog.hidden) closeSearch();
        else openSearch();
      } else if (event.key === 'Escape' && dialog && !dialog.hidden) {
        closeSearch();
      }
    });
  });
})();
