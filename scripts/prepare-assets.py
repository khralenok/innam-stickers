"""Prepare lightweight gallery copies; original PNGs in src are never changed.

Run from any directory: python3 scripts/prepare-assets.py (requires Pillow).
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
for folder, size, quality in [("thumbnails", 240, 82), ("previews", 900, 90)]:
    destination = ROOT / "assets" / folder
    destination.mkdir(parents=True, exist_ok=True)
    for source in sorted((ROOT / "src").glob("[0-9][0-9]-*.png")):
        with Image.open(source) as image:
            image = image.convert("RGB")
            image.thumbnail((size, size), Image.Resampling.LANCZOS)
            image.save(destination / (source.stem + ".webp"), "WEBP", quality=quality, method=6)
print("Prepared gallery thumbnails and previews. Original PNGs unchanged.")
