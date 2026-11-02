# INNAM sticker gallery

A responsive, buildless gallery for the 20 final images in `src`. Select a thumbnail for a larger preview, or use the previous/next buttons and left/right arrow keys. Links such as `#14` open a particular sticker. Instructions sit above the preview and thumbnail grid.

## View locally

Open `index.html` directly, or run `python3 -m http.server 8000` in this directory and visit http://localhost:8000.

## Deploy to GitHub Pages

1. Push this directory to a GitHub repository, including `assets` and `src`.
2. In the repository’s **Settings → Pages**, select **Deploy from a branch**.
3. Select your branch and **/ (root)**, then save.

No npm dependencies or build command are needed. All paths are relative, including downloads, so the gallery works at a repository URL. `.nojekyll` keeps the deployment a plain static site.

## Update the images

Replace the corresponding final PNGs in `src`, then run `python3 scripts/prepare-assets.py` to refresh the optimized WebP thumbnails and previews. The helper requires Pillow (`python3 -m pip install Pillow`). Commit the updated assets with your PNGs. Original PNGs remain the download source and are never modified by the helper.

Sticker titles, descriptions, and image filenames are listed in `app.js`. Styles use the INNAM fern, sage, apricot and cream palette. There are no external font, tracking or runtime requests.
