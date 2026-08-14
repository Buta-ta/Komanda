# Base de données — Supabase + Prisma

## 1. Créer le projet Supabase

1. Va sur https://supabase.com → **New project**.
2. Choisis une région proche de l'Afrique de l'Ouest (ex. `eu-west-1` ou `af-south-1` si disponible).
3. Note le mot de passe de la base.
4. Dans **Project Settings → Database**, récupère :
   - **Connection string (URI)** en mode **Transaction** → `DATABASE_URL`
   - **Connection string (URI)** en mode **Session / Direct** → `DIRECT_URL`

## 2. Installer Prisma

```bash
npm install -D prisma
npm install @prisma/client
npx prisma generate
```

## 3. Configurer l'environnement

Crée un fichier `.env.local` à la racine du projet :

```bash
# Récupérés depuis Supabase (remplace <password> et <ref>)
DATABASE_URL="postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://<ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"

# Fedapay (tes clés de production)
FEDAPAY_SECRET_KEY="sk_prod_..."
NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY="pk_prod_..."
FEDAPAY_WEBHOOK_SECRET="whsec_..."

# Auth
AUTH_SECRET="génère une chaîne longue et aléatoire"
NEXTAUTH_URL="http://localhost:3000"
```

Génère `AUTH_SECRET` avec :
```bash
openssl rand -base64 32
```

## 4. Applique le schéma

```bash
npx prisma db push
```

Cette commande crée toutes les tables dans Supabase.

## 5. Injecte les données de départ

Ajoute dans `package.json` :

```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

Puis installe tsx et lance le seed :

```bash
npm install -D tsx
npx prisma db seed
```

Tu auras alors :
- 2 bases (Vitrine, Vitrine 3D Motion)
- 1 agent IA WhatsApp
- ~45 suppléments
- 3 packs préconfigurés

## 6. Ouvre Prisma Studio (optionnel)

```bash
npx prisma studio
```

Tu peux voir et modifier les données sur http://localhost:5555.

## 7. (Plus tard) Migrations

Une fois en production, on utilisera `prisma migrate dev` / `prisma migrate deploy` pour versionner les changements.

---

## Tables créées

| Table | Rôle |
|---|---|
| `Product` | Bases, suppléments, packs, agents, apps |
| `PackItem` | Liaison pack ↔ produits inclus |
| `Customer` | Profil client (id = Supabase Auth) |
| `Order` | Commande, montants, statut, contact invité |
| `OrderItem` | Ligne de commande (snapshot prix) |
| `OrderEvent` | Historique de suivi de commande |
| `Payment` | Transactions Fedapay |
| `Invoice` | Factures PDF |
| `Subscription` | Abonnements récurrents |
| `Project` | Showroom des réalisations |
| `Setting` | Clé/valeur pour config admin |

## Voir le schéma en image

```bash
npx prisma generate
npx prisma studio
```
