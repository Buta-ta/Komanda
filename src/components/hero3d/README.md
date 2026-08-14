# Hero 3D hybride — Komanda

Le chat et le chien restent. On change le médium et la fin.

## Plan (scroll 0 → 1)

1. **0 – 52%** — Tes 94 frames jouent sur un *plan-film* 3D dans le studio jaune.
2. **48 – 72%** — Le plan est poussé hors champ (comme la télé). La caméra avance dans le vide jaune.
3. **62 – 90%** — La touche Komanda (objet 3D, même signe que le logo) entre et s’enfonce.
4. **80 – 100%** — Le texte et le CTA naissent dans l’espace libéré.

`prefers-reduced-motion` → repli sur `HeroPush` (canvas 2D).

## Fichiers

| Fichier | Rôle |
|---|---|
| `phases.ts` | Mapping scroll → film / exit / key / press / copy |
| `useFilmFrames.ts` | Précharge `/public/hero-push/p_XXX.jpg` |
| `KomandaKey.tsx` | Touche 3D + flèche Entrée extrudée |
| `Scene.tsx` | Studio, lumières, plan-film, caméra |
| `HeroWorld.tsx` | Stage sticky + overlay UI + Canvas |

## Branchement

`page.tsx` importe `HeroMount` (client + `dynamic ssr:false`) → `HeroWorld`.
