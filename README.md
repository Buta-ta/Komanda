# Komanda

Plateforme PWA de vente de sites web, applications, agents IA et audits pour l'Afrique de l'Ouest et Centrale.

- **Vitrine** à partir de 10 000 CFA
- **3D Motion** à partir de 15 000 CFA
- **Agent IA WhatsApp** 5 000 CFA / mois
- Paiement Mobile Money via **Fedapay**, livraison en 72h

## Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4 + Framer Motion + Lucide
- Canvas frame-par-frame pour le hero (le chat et le chien poussent la télé)
- (à venir) PostgreSQL + Prisma, NextAuth, Fedapay SDK, n8n

## Démarrer en local

Prérequis : **Node.js 20+**.

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer le build |
| `npm run lint` | Linter |

## Structure

```
src/
  app/
    page.tsx              # Landing (hero poussé + offres + showroom + agent + suppléments)
    showroom/page.tsx     # Page dédiée au showroom des réalisations
    configurateur/page.tsx # Tunnel de commande
    agent/page.tsx        # Agent IA WhatsApp
    suivi/page.tsx        # Suivi de commande
    devis/page.tsx        # Demande de devis
    admin/page.tsx        # Back-office (démo)
    layout.tsx, globals.css
  components/
    HeroPush.tsx          # Hero frame-par-frame (télé poussée par le chat/chien)
    HeroScroll.tsx        # Ancien hero ananas (conservé en option)
    Showroom.tsx          # Grille de projets filtrable
    Logo.tsx
  lib/
    catalog.ts            # Bases, suppléments, packs
    projects.ts           # Projets du showroom
public/
  hero-push/              # 94 frames du hero poussé (1280×720)
  fonts/                  # Bricolage Grotesque + Plus Jakarta Sans
```

## Le hero poussé

- 94 frames (1280×720) dans `public/hero-push/`.
- Le scroll pilote la frame affichée.
- La télé glisse vers la droite → l'espace jaune se libère à gauche.
- Le titre « Ton site, livré en 72h. » apparaît progressivement dans l'espace libéré.
- Le soulignement corail se dessine sous le mot « livré ».

## Showroom

- 6 projets d'exemple dans `src/lib/projects.ts` (vitrine, 3D, e-commerce, agent).
- Filtres par catégorie.
- À brancher sur la base de données et le back-office admin pour ajout/suppression.

## Personnaliser

- Catalogue des prix : `src/lib/catalog.ts`
- Projets du showroom : `src/lib/projects.ts`
- Couleurs de marque : `src/app/globals.css` (variables `@theme`)
- Polices : fichiers dans `public/fonts/`, déclarés dans `globals.css`

## Variables d'environnement

Copie `.env.example` en `.env.local`.

## Déploiement

1. Pousse sur GitHub.
2. Importe dans Vercel.
3. Ajoute les variables d'environnement.
4. Déploie.

## Roadmap

- [x] Landing + hero poussé frame-par-frame
- [x] Configurateur (base + suppléments + packs)
- [x] Showroom des réalisations
- [x] Agent IA / suivi / devis / admin (démo)
- [ ] Base de données (Prisma + PostgreSQL)
- [ ] Authentification clients
- [ ] Intégration Fedapay
- [ ] Pipeline de production et onboarding
- [ ] Agent n8n + WhatsApp Business API
- [ ] PWA (service worker, push)
