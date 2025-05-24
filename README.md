# e-cantine

e-cantine est une application web moderne de gestion de cantine scolaire, permettant l’administration des menus, des articles, des commandes, des utilisateurs et bien plus. Elle s’appuie sur Next.js, Prisma, PostgreSQL et une interface d’administration avancée.

## Fonctionnalités principales

- **Gestion des articles** : création, modification, suppression et filtrage des plats/produits proposés.
- **Gestion des catégories et types** : organisation des articles par catégories et types pour une meilleure navigation.
- **Gestion des utilisateurs** : administration des profils, rôles (admin, client, etc.) et statuts d’activation.
- **Gestion des commandes** : suivi des commandes, paiements, livraisons et historiques.
- **Tableaux de bord** : statistiques et visualisation des données en temps réel pour les administrateurs.
- **Authentification sécurisée** : gestion des accès et des sessions.
- **API RESTful** : endpoints pour l’intégration externe ou mobile.
- **Pagination, filtres, recherche avancée** sur toutes les entités.

## Stack technique

- **Next.js** (React 19) — Frontend et Backend unifiés (App Router)
- **Prisma** — ORM pour PostgreSQL
- **TypeScript** — Typage fort sur tout le projet
- **Bootstrap 5** — UI moderne et responsive
- **Zustand** — State management
- **Yup / React Hook Form** — Validation et gestion des formulaires
- **Swagger** — Documentation interactive de l’API

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd e-cantine
   ```

2. **Configurer les variables d’environnement**
   - Copier `.env.example` en `.env` et renseigner les accès à la base PostgreSQL.

3. **Installer les dépendances**
   ```bash
   yarn install
   # ou
   npm install
   ```

4. **Préparer la base de données**
   ```bash
   yarn prisma migrate dev
   yarn prisma generate
   ```

5. **Lancer le serveur de développement**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

6. Accéder à l’application sur [http://localhost:3000](http://localhost:3000)

## Scripts utiles

- `yarn dev` : Démarre le serveur Next.js en mode développement
- `yarn build` : Build production
- `yarn start` : Démarre le serveur Next.js en production
- `yarn prisma migrate dev` : Applique les migrations Prisma
- `yarn prisma generate` : Génère le client Prisma

## Structure du projet

- `src/app` : Pages et routes de l’application (admin, client, auth…)
- `prisma/schema.prisma` : Modèle de données
- `public/` : Fichiers statiques
- `components/` : Composants réutilisables
- `stores/` : State management
- `repositories/` : Accès aux données (pattern repository)

## Contribution

Les contributions sont les bienvenues ! Merci de créer une issue ou une pull request.

## Licence

Projet sous licence MIT.
