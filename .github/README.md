# Academic Builder

An academic website template with easy setup and advanced navigation tools.

<p align="center">
  <a href="https://bhattharshit.github.io/academic-builder/">
    <img src="../static/images/demo.gif"
         alt="Academic Website Template Demo"
         width="900">
  </a>
</p>

<p align="center">
  <a href="https://bhattharshit.github.io/academic-builder/">
    <strong>View Live Demo →</strong>
  </a>
</p>

## Quick start

1. Create a GitHub account if you don't have one and log in with it.
2. Click **Use this template** in the top right corner.
3. Create a **new repository** and name it: `your_Github_username.github.io`. 
4. Open **Settings → Pages** and under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Edit `data/profile.toml` slightly and commit changes. (OR, open **Actions → Deploy Hugo site to GitHub Pages → Run workflow**.)
4. Your website will be available at:  `https://your_Github_username.github.io/`
5. Edit `data/profile.toml` to update your information and replace `static/images/avatar.svg` and `static/files/cv.pdf` with your files.

## One-file site customization

Edit only:

```text
data/profile.toml
```

It controls your name, title, institution, department, email, location, profile image, bio, education, research interests, CV, social links, theme behavior, search, selected publications, sidebar width, content width, and accent colors.

## Add a page/tab

Create any top-level Markdown file in `content/`:

```yaml
---
title: "Projects"
weight: 25
---

Your content here.
```

It automatically becomes a desktop and mobile navigation tab. Lower `weight` values appear first.

Useful optional front matter:

```yaml
menu: false        # keep the page but hide its navigation tab
toc: true          # show an on-page table of contents
math: true         # load MathJax for LaTeX
search: false      # omit the page from site search
external_url: "https://example.com"  # make the tab open an external page
```

## Publications

Edit:

```text
data/publications.toml
```

The Publications page and homepage Selected Publications section update automatically. Entries can include DOI, PDF, code, abstract, BibTeX, and a `selected = true` flag.

## CV

Replace:

```text
static/files/cv.pdf
```

The CV tab opens the PDF directly. Change its path or label in `data/profile.toml` if needed.

## Run locally (optional)

Install Hugo Extended, then run:

```bash
hugo server
```

## Main structure

```text
content/                  # Independent Markdown pages / navigation tabs
data/profile.toml         # Site-wide identity, links, design, and features
data/publications.toml    # Publication records
layouts/                  # Hugo templates and publication renderer
static/css/site.css       # Visual system
static/js/site.js         # Theme, mobile menu, search, back-to-top
static/images/            # Profile image and site images
static/files/cv.pdf       # CV
.github/workflows/        # GitHub Pages deployment
```


## Acknowledgements

This website template is an independent Hugo implementation inspired in part by [**al-folio**](https://github.com/alshedivat/al-folio), an open-source academic website project by Maruan Al-Shedivat and contributors, distributed under the MIT License.

The template is built with [Hugo](https://gohugo.io/) and optionally uses [MathJax](https://www.mathjax.org/) for mathematical typesetting.

**Design and Hugo implementation:** [Harshit Bhatt](https://bhattharshit.github.io/).
