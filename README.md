# Midnitetech mod status tracker

## Files

- `index.html`: page headings, dates, filters and footer.
- `styles.css`: colours, spacing, card columns and responsive layout.
- `font.css`: bundled custom SimsHeadline font. Keep this file.
- `app.js`: card rendering, search, filters, sorting and theme toggle.
- `data/mods.js`: the editable mod data. No JSON copy is required.
- `icons/`: all card icons and the site banner.
- `.nojekyll`: keeps GitHub Pages serving plain static files.

## Update a mod

Open `data/mods.js`, find its name, and edit its existing entry.

- `description`: `[Download](https://YOUR-DOWNLOAD-LINK)`.
- `fields.Last Updated`: the mod update date in ISO format.
- `fields.Mod Status`: `Free` or `Early Access`.
- `fields.Mod Type`: a category such as `Gameplay Mod`, `Career Mod`, `Aspiration` or `Other`.
- `status`: `Compatible` or `Retired`.
- `recent`: `true` adds the Recently Updated/New badge; `false` removes it.
- Keep `Published` as the original release date.
- Keep the name and icon unless those changed. Icon paths must exactly match files in `icons/`.

Preserve quotation marks, commas and the opening `window.MOD_TRACKER_DATA =`.

Update `snapshotDate` near the top of the data file and the visible Tracker Last Updated date in `index.html`. Change `patchDate` only when compatibility applies to a newer Sims 4 patch.

## Preview and publish

Extract the full folder and open `index.html`, or use your existing Live Server preview. Check the cards and filters, then upload changed files to your GitHub repository and commit them. After deployment, refresh with Ctrl + Shift + R.

For initial GitHub Pages setup, upload this folder's contents to the repository root. In Settings > Pages select Deploy from a branch, main, /(root), then Save. Use the published URL GitHub provides.

For Canva, link a button to that published URL. Canva's Embed feature does not reliably support arbitrary HTML websites. There is no live external data service or automatic mod update check.
