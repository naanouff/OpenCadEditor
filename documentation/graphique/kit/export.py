#!/usr/bin/env python3
"""Exporte le kit logo SVG → PNG + WebP (tailles app + wordmarks)."""

from __future__ import annotations

from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent
SVG = ROOT / "svg"
PNG = ROOT / "png"
WEBP = ROOT / "webp"

ICON_SIZES = (512, 256, 128, 64, 48, 32, 16)
WORDMARK_WIDTHS = (1200, 800, 600, 400, 240)

# Symboles extraits de planche-identite.svg (pas de redessin).
ICONS = (
    "icon-opencad-std",
    "icon-opencad-std-light",
    "icon-editor-std",
    "icon-editor-std-light",
    "icon-team-std",
    "icon-team-std-light",
    "icon-opencad-mini",
    "icon-editor-mini",
    "icon-team-mini",
)
WORDMARKS = (
    "wordmark-opencad-dark",
    "wordmark-opencad-light",
    "wordmark-opencad-editor-dark",
    "wordmark-opencad-editor-light",
    "wordmark-opencad-team-dark",
    "wordmark-opencad-team-light",
)


def svg_to_png(svg_path: Path, png_path: Path, *, width: int | None = None, height: int | None = None) -> None:
    png_path.parent.mkdir(parents=True, exist_ok=True)
    kwargs: dict = {"url": svg_path.as_uri(), "write_to": str(png_path)}
    if width is not None:
        kwargs["output_width"] = width
    if height is not None:
        kwargs["output_height"] = height
    cairosvg.svg2png(**kwargs)


def png_to_webp(png_path: Path, webp_path: Path) -> None:
    webp_path.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(png_path) as im:
        im.save(webp_path, "WEBP", quality=92, method=6)


def export_square(name: str, sizes: tuple[int, ...]) -> None:
    svg = SVG / f"{name}.svg"
    for size in sizes:
        png = PNG / name / f"{name}-{size}.png"
        webp = WEBP / name / f"{name}-{size}.webp"
        svg_to_png(svg, png, width=size, height=size)
        png_to_webp(png, webp)
        print(f"  {name} {size}px")


def export_wordmark(name: str, widths: tuple[int, ...]) -> None:
    svg = SVG / f"{name}.svg"
    for width in widths:
        png = PNG / name / f"{name}-w{width}.png"
        webp = WEBP / name / f"{name}-w{width}.webp"
        svg_to_png(svg, png, width=width)
        png_to_webp(png, webp)
        print(f"  {name} w={width}")


def main() -> None:
    print("Icons (planche)")
    for name in ICONS:
        export_square(name, ICON_SIZES)
    print("Wordmarks (planche)")
    for name in WORDMARKS:
        export_wordmark(name, WORDMARK_WIDTHS)
    print("Done →", ROOT)


if __name__ == "__main__":
    main()
