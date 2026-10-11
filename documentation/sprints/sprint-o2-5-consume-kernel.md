# Sprint O2-5 — Éditeur consomme `@opencad/kernel`

Branche: `feature/o2-5-consume-kernel`.

## But

Brancher OpenCadEditor sur le paquet OpenCAD via `vendor/opencad` (submodule `develop`).

## Livrables

- Submodule `vendor/opencad`
- Dépendance + alias Vite `@opencad/kernel`
- `opsDepuisFonction.ts` = réexport kernel
- CI init submodule public

## Hors scope

Remplacer tout `pipelineOcct` / GCS par le compiler kernel (suite O2).
