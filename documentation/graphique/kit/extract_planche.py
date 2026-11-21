#!/usr/bin/env python3
"""Extrait les symboles de la planche SVG officielle en fichiers autonomes."""

from __future__ import annotations

import xml.etree.ElementTree as ET
from pathlib import Path

NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)

ROOT = Path(__file__).resolve().parents[1]
PLANCHE = ROOT / "planche-identite.svg"
OUT = Path(__file__).resolve().parent / "svg"

# viewBox natif de chaque symbole (grille de la planche)
BOXES = {
    "icon-opencad-std": "0 0 48 48",
    "icon-opencad-std-light": "0 0 48 48",
    "icon-editor-std": "0 0 48 48",
    "icon-editor-std-light": "0 0 48 48",
    "icon-team-std": "0 0 48 48",
    "icon-team-std-light": "0 0 48 48",
    "icon-opencad-mini": "0 0 24 24",
    "icon-editor-mini": "0 0 24 24",
    "icon-team-mini": "0 0 24 24",
}

FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"


def local(tag: str) -> str:
    return tag.split("}")[-1] if "}" in tag else tag


def inner_xml(el: ET.Element) -> str:
    parts = []
    if el.text and el.text.strip():
        parts.append(el.text)
    for child in list(el):
        parts.append(ET.tostring(child, encoding="unicode"))
    return "".join(parts)


def wrap(view_box: str, body: str, label: str) -> str:
    return (
        f'<svg xmlns="{NS}" viewBox="{view_box}" fill="none" role="img" aria-label="{label}">\n'
        f"{body}\n</svg>\n"
    )


def extract_symbols(tree: ET.ElementTree) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    root = tree.getroot()
    for el in root.iter():
        if local(el.tag) != "g":
            continue
        gid = el.get("id")
        if gid not in BOXES:
            continue
        # Le groupe porte stroke-linecap ; on le conserve tel quel.
        body = ET.tostring(el, encoding="unicode")
        (OUT / f"{gid}.svg").write_text(wrap(BOXES[gid], body, gid), encoding="utf-8")
        print("symbol", gid)


def wordmark(name: str, icon_id: str, lines: list[str], width: int, height: int) -> None:
    icon = (OUT / f"{icon_id}.svg").read_text(encoding="utf-8")
    # retire l'enveloppe svg du symbole
    start = icon.find(">") + 1
    end = icon.rfind("</svg>")
    inner = icon[start:end]
    body = f'<g transform="translate(8,10)">{inner}</g>\n' + "\n".join(lines)
    (OUT / f"{name}.svg").write_text(wrap(f"0 0 {width} {height}", body, name), encoding="utf-8")
    print("wordmark", name)


def main() -> None:
    tree = ET.parse(PLANCHE)
    extract_symbols(tree)

    wordmark(
        "wordmark-opencad-dark",
        "icon-opencad-std",
        [
            f'<text x="64" y="38" font-family="{FONT}" font-size="28" letter-spacing="-0.03em">'
            '<tspan fill="#94a3b8" font-weight="400">open</tspan>'
            '<tspan fill="#22d3ee" font-weight="700">CAD</tspan></text>',
        ],
        280,
        68,
    )
    wordmark(
        "wordmark-opencad-light",
        "icon-opencad-std-light",
        [
            f'<text x="64" y="38" font-family="{FONT}" font-size="28" letter-spacing="-0.03em">'
            '<tspan fill="#475569" font-weight="400">open</tspan>'
            '<tspan fill="#0284c7" font-weight="700">CAD</tspan></text>',
        ],
        280,
        68,
    )
    wordmark(
        "wordmark-opencad-editor-dark",
        "icon-editor-std",
        [
            f'<text x="64" y="32" font-family="{FONT}" font-size="26" letter-spacing="-0.03em">'
            '<tspan fill="#94a3b8" font-weight="400">open</tspan>'
            '<tspan fill="#22d3ee" font-weight="700">CAD</tspan></text>',
            f'<text x="66" y="54" fill="#f59e0b" font-family="{FONT}" font-size="16" font-weight="600">Editor</text>',
        ],
        300,
        72,
    )
    wordmark(
        "wordmark-opencad-editor-light",
        "icon-editor-std-light",
        [
            f'<text x="64" y="32" font-family="{FONT}" font-size="26" letter-spacing="-0.03em">'
            '<tspan fill="#475569" font-weight="400">open</tspan>'
            '<tspan fill="#0284c7" font-weight="700">CAD</tspan></text>',
            f'<text x="66" y="54" fill="#d97706" font-family="{FONT}" font-size="16" font-weight="600">Editor</text>',
        ],
        300,
        72,
    )
    wordmark(
        "wordmark-opencad-team-dark",
        "icon-team-std",
        [
            f'<text x="64" y="32" font-family="{FONT}" font-size="26" letter-spacing="-0.03em">'
            '<tspan fill="#94a3b8" font-weight="400">open</tspan>'
            '<tspan fill="#22d3ee" font-weight="700">CAD</tspan></text>',
            f'<text x="66" y="54" fill="#10b981" font-family="{FONT}" font-size="16" font-weight="700" letter-spacing="0.08em">TEAM</text>',
        ],
        300,
        72,
    )
    wordmark(
        "wordmark-opencad-team-light",
        "icon-team-std-light",
        [
            f'<text x="64" y="32" font-family="{FONT}" font-size="26" letter-spacing="-0.03em">'
            '<tspan fill="#475569" font-weight="400">open</tspan>'
            '<tspan fill="#0284c7" font-weight="700">CAD</tspan></text>',
            f'<text x="66" y="54" fill="#059669" font-family="{FONT}" font-size="16" font-weight="700" letter-spacing="0.08em">TEAM</text>',
        ],
        300,
        72,
    )


if __name__ == "__main__":
    main()
