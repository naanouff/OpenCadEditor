# Kit logo — symboles de la planche

Source unique : [`../planche-identite.svg`](../planche-identite.svg) (copie de `planche_d_identit_vectorielle_opencad_editor_team.svg`).

Les fichiers de `svg/` sont **extraits** de cette planche (`extract_planche.py`), pas redessinés.

| Symbole | Produit |
|---------|---------|
| `icon-opencad-std` / `-light` / `-mini` | openCAD (.cadom) |
| `icon-editor-std` / `-light` / `-mini` | openCAD Editor |
| `icon-team-std` / `-light` / `-mini` | openCAD TEAM (émeraude) |
| `wordmark-opencad-*` | logo horizontal, typo de la planche |
| `wordmark-opencad-editor-*` | + Editor ambre |
| `wordmark-opencad-team-*` | + TEAM émeraude |

PNG / WebP : 512→16 px pour les icônes, largeurs 1200→240 pour les wordmarks.

```bash
python documentation/graphique/kit/extract_planche.py
python documentation/graphique/kit/export.py
```
