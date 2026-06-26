# rostro.org — main site

The `site/` directory is the source for **rostro.org** — the canonical
front-door of the Rostro network. Plain HTML + one CSS file. No build
step, no framework, no Jekyll.

| Subdomain | What lives there | Source |
|---|---|---|
| **rostro.org** | this site (landing, mission, whitepaper) | `site/` (here) |
| **blog.rostro.org** | Substack | external |
| **docs.rostro.org** | technical spec sheets (RNS, zkpki, etc.) | separate (to port) |

## Layout

```
site/
├── CNAME                # rostro.org — read by GitHub Pages
├── index.html           # landing — rostro.org/
├── mission/
│   └── index.html       # rostro.org/mission/
├── whitepaper/
│   └── index.html       # rostro.org/whitepaper/ — renders /docs/WHITEPAPER.md
├── privacy/
│   └── index.html       # rostro.org/privacy/ — privacy policy
├── terms/
│   └── index.html       # rostro.org/terms/ — terms of service
├── favicon.ico          # 16/32/48 fallback (legacy + crawlers)
├── favicon.svg          # primary favicon — R mark, dark-mode aware
├── favicon-16/32/48.png # raster icons (cropped from the brand lockup)
├── apple-touch-icon.png # 180×180 home-screen icon (mark on cream)
├── og-image.png         # social card — white R lockup on black
├── assets/
│   ├── style.css            # shared stylesheet — all pages reference it
│   ├── rostro-mark.svg      # R monogram (nav/footer), ink fill
│   ├── rostro-mark-white.svg# R monogram, white fill (dark surfaces)
│   ├── rostro-logo.svg      # full R + ROSTRO lockup (black)
│   └── rostro-logo-white.svg# full lockup (white)
└── README.md            # this file
```

The brand mark is the geometric **R monogram** (the favicon, nav, and footer
all draw from it). The favicons were produced by cropping the mark out of the
provided brand lockup; the source artwork lives in the brand kit, not the repo.

One directory per route, each with its own `index.html`. URLs are
`rostro.org/`, `rostro.org/mission/`, `rostro.org/whitepaper/` — no
`.html` extensions in the public address bar.

The whitepaper page reads the markdown from
`https://raw.githubusercontent.com/RostroF/Rostro/rostro-main/docs/WHITEPAPER.md`
so the source-of-truth stays at `/docs/WHITEPAPER.md` in the repo. Edit
the markdown; the rendered page reflects the change on next reload. If
the Foundation ever serves the whole repo from GH Pages (not just
`/site/`), the local path `/docs/WHITEPAPER.md` is wired as a fallback.

## Deploying via GitHub Pages

In repo settings → Pages, point the source to:

- **Branch:** `rostro-main` (or whichever is canonical)
- **Folder:** `/site`

GitHub Pages will read `CNAME` and serve at `https://rostro.org`. Add an
`A`/`CNAME` record at your DNS for `rostro.org` (and `www.rostro.org`)
pointing at GitHub's Pages IPs / `<org>.github.io`.

If the site moves to a dedicated repo (e.g.
`RostroF/RostroF.github.io`), copy `site/` to the new repo root and
update the relative path in `whitepaper/index.html` — the `PATHS`
array near the bottom of that file falls back to a raw-GitHub URL,
so the dedicated-repo case is already covered.

## Porting existing HTML in

When you bring HTML over from your prior GitHub Pages account:

1. Drop the new file in `site/` (e.g. `site/rns.html`, `site/zkpki.html`).
2. Keep the same `<header class="site">` and `<footer class="site">`
   blocks the other pages use — copy them from `mission.html`.
3. Replace whatever stylesheet the source used with
   `<link rel="stylesheet" href="assets/style.css">`.
4. If the ported page has primitive-specific styles, add them under a
   page-scoped class (e.g. `<body class="rns">`) and append the rules
   to `assets/style.css` under a `/* ============ rns page */` block,
   not as a separate CSS file. One stylesheet = one cache hit.

Spec-sheet content (RNS / zkpki / PoP detail) probably belongs at
**docs.rostro.org**, not here. This site is for the story and the
call. The docs subdomain is for the receipts.

## Placeholders to update before launch

Search-and-replace these in all `.html` files before pushing live:

- `https://github.com/RostroF/Rostro` is the canonical repo. If the
  Foundation moves to a different org, search-and-replace.
- `mailto:hello@rostro.org` is a placeholder. Confirm the actual
  contact address before launch (could be `hello@`, `partnerships@`,
  or a personal address).
- `https://blog.rostro.org` → confirm Substack CNAME wired
- `https://docs.rostro.org` → confirm docs subdomain wired

`og:image` is wired on every page to `/og-image.png` (the white R lockup
on black). Swap that file if a dedicated social card is designed later.

## Voice and aesthetic

The site mirrors the whitepaper's posture: measured, serious, no
marketing rhetoric, no animations, no emoji. Serif headers (Newsreader)
for gravitas; system sans body for clarity; oxblood accent (`#7A1F2B`)
used sparingly. Generous whitespace. The words do the work.

When adding pages, keep:
- One H1 per page.
- `eyebrow` (mono, oxblood) above the H1/H2 for section labels.
- `lede` (large serif) for the one-sentence summary under a section
  header.
- Bullet lists for inventory-style content; paragraphs for argument.
- Bold for the load-bearing claim of a paragraph; italics for quoted
  speech or emphasis on a single phrase.

If a new page wants a different visual register, add it as a body-class
override rather than a new CSS file.
