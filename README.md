# Midnitetech mod status tracker

A build-free GitHub Pages site styled from the supplied Canva support HTML: #fcfbfc paper, #5d7ca6 blue, #304254 ink, and the supplied Sims headline font.

## Publish on GitHub Pages

1. Unzip this project. Create a GitHub repository (for example `mod-status-tracker`).
2. Upload the CONTENTS of this folder to its root, including `data/` and `.nojekyll`. `index.html` must be at the repository root.
3. In Settings → Pages → Build and deployment, select **Deploy from a branch**, **main**, **/(root)**, and Save.
4. Wait for deployment. Open the exact site URL GitHub displays, normally `https://YOUR-USERNAME.github.io/mod-status-tracker/`.
5. Verify that 45 mods load and search works. Keep the trailing slash. All local asset paths are relative, so project repositories work.

No build command, API key, subscription, or backend is required. This ZIP is ready to upload; it has not been deployed to your account.

## Canva Embed: limitation and fallback

Canva uses Iframely for supported rich-media URLs. Canva explicitly documents that Iframely cannot embed arbitrary HTML files. A normal GitHub Pages app is therefore NOT a guaranteed supported embed. Hosting the files on GitHub does not remove this limitation; adding iframe code or HTML/CSS to Canva's Embed box does not install this project in Canva.

You may try Apps → Embed in the Canva editor with the published HTTPS Pages URL. If Canva accepts it, resize it to approximately 1100 × 900 and check the published Canva website on desktop and mobile: typing, filters, expansion, scrolling, and external links. No live Canva embed was tested here. Canva controls embed size and may cache content; automatic iframe height is not guaranteed.

**Reliable fallback:** add a Canva button reading **Open mod status tracker ↗** and set its link to your exact GitHub Pages URL. Use the Pages URL after deployment. The tracker also has its own Open full tracker link when framed.

For a different website builder that permits arbitrary iframes, use this after replacing the URL (this is NOT a Canva workaround):

```html
<iframe src="https://YOUR-USERNAME.github.io/mod-status-tracker/"
  title="Midnitetech mod status tracker" width="100%" height="1000"
  style="border:0" loading="lazy"></iframe>
```

## Edit the project

- `index.html`: headings, page structure, navigation and patch notice.
- `styles.css`: colours, spacing, layout, responsive rules.
- `app.js`: search, status/type/access filters, sort and safe rendering.
- `data/mods.js`: all public content and field definitions. Edit this file to update mods without touching the layout. Keep the opening `window.MOD_TRACKER_DATA =` and closing semicolon.
- `data/mods.json`: original JSON snapshot retained as an import reference; the page does not fetch it.
- `font.css`: supplied font embedded as a data URI; no standalone font file is distributed. This is bundling, not access control: a published browser font remains retrievable from CSS. Use only where your font licence permits web use.
- `.nojekyll`: serve as a plain static site.

To update a mod, edit its `name`, `description`, `status` (`Compatible` or `Needs fixing`), `recent` flag and `fields`. Missing fields display “Not specified”. `Mod Status` retains the Trello access value (Free/Early Access); compatibility comes from the board list. Dates use ISO format. Update `patchDate` and `snapshotDate` in `data/mods.js` AND the visible snapshot label in `index.html` for a new export. Commit changes and wait for Pages to redeploy.

The tracker is an exported snapshot, not a live Trello sync. It does not re-check compatibility after new patches. It does not claim all mods were updated on the patch date.

## Import record

Source: supplied Trello export, board “Mod Status Tracker (✅ October 27, 2026)”.

58 open cards in open lists were imported: 45 mod entries (43 compatible, including 5 recent/new; 2 needing fixes), 6 Links & Info cards, and 7 heading/board-note cards. Headings stay in Links & Info and are not counted as mods. Archived cards and archived lists were excluded. The board's compatibility note supports treating recent/new entries as compatible with the October 27 patch.

All five custom-field definitions and their populated values were retained: Last Updated, Published, Risk, Mod Status, Mod Type. Missing values were not inferred. Mod descriptions, labels, source links, attachment URLs, and checklists were retained. Descriptions display as safe text with clickable HTTP(S) URLs/Markdown links; other Markdown formatting remains literal. No members, comments, activity history or credentials are bundled. Attachments link to the original hosts and were not downloaded.

## Preview and checks

Extract the full ZIP and double-click `index.html`. The bundled `data/mods.js` loads before the app, so no fetch request or Trello connection is needed. You can also preview over HTTP:

```sh
python -m http.server 8000
```

Open http://localhost:8000/ from this folder. No dependency installation is needed.

## References

- GitHub Pages publishing: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Canva embedding and its arbitrary-HTML limitation: https://www.canva.dev/docs/apps/embedding-rich-media/
- Canva editor embed help: https://www.canva.com/help/embed-media/
