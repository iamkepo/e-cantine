# Configuration des OAuth Providers

## Google OAuth Setup

### 1. Aller à Google Cloud Console
- https://console.cloud.google.com/
- Créer un nouveau projet

### 2. Activer Google+ API
- Rechercher "Google+ API"
- Cliquer "Enable"

### 3. Créer les credentials OAuth
- Aller à "Credentials" dans le menu
- Cliquer "Create Credentials" → "OAuth client ID"
- Choisir "Web application"
- Ajouter les URI autorisés:
  ```
  http://localhost:3000
  http://localhost:3000/api/v1/auth/better/callback/google
  ```
- Copier le Client ID et Client Secret

### 4. Ajouter à `.env.local`
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

---

## GitHub OAuth Setup

### 1. Aller à GitHub Settings
- https://github.com/settings/developers
- Cliquer "New OAuth App"

### 2. Remplir les infos
- **Application name**: e-cantine
- **Homepage URL**: http://localhost:3000
- **Authorization callback URL**: http://localhost:3000/api/v1/auth/better/callback/github

### 3. Générer le secret
- Copier le Client ID
- Générer un nouveau Client Secret

### 4. Ajouter à `.env.local`
```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

---

## Discord OAuth Setup

### 1. Aller à Discord Developer Portal
- https://discord.com/developers/applications
- Cliquer "New Application"

### 2. Configurer OAuth2
- Aller à "OAuth2" → "General"
- Copier le Client ID
- Cliquer "Reset Secret" et copier le nouveau secret

### 3. Ajouter les URIs autorisés
- Aller à "OAuth2" → "Redirects"
- Ajouter: `http://localhost:3000/api/v1/auth/better/callback/discord`

### 4. Ajouter à `.env.local`
```env
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
```

---

## Configuration Finale

### `.env.local` complet
```env
# Database
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=your_generated_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

### Pour Production

Remplacer:
- `http://localhost:3000` → votre domaine (ex: `https://e-cantine.com`)
- `BETTER_AUTH_URL` → le domaine de votre serveur
- `NEXT_PUBLIC_APP_URL` → le domaine public

---

## Testing OAuth Flow

### 1. Démarrer le serveur
```bash
yarn dev
```

### 2. Aller à la page de login
```
http://localhost:3000/en/auth/login
```

### 3. Cliquer sur un bouton OAuth
- Les boutons "Google", "GitHub", "Discord" doivent apparaître
- Cliquer sur l'un d'eux vous redirige vers le provider
- Après authentification, vous êtes redirigé avec une session créée

### 4. Vérifier les cookies
- Ouvrir DevTools (F12)
- Aller à "Application" → "Cookies"
- Vous devriez voir des cookies de session better-auth

---

## Troubleshooting

### "Invalid redirect URI"
- Vérifier que l'URL de callback correspond exactement sur le provider
- Attention à http vs https, localhost vs domaine

### "Client ID not configured"
- Vérifier que les variables d'env sont dans `.env.local` (pas `.env`)
- Redémarrer le serveur après modification
- `yarn dev` doit afficher les variables chargées

### "Session not created"
- Vérifier la base de données est correctement migrée
- `npx prisma migrate dev`
- Vérifier `BETTER_AUTH_SECRET` est défini
- Vérifier les cookies sont acceptés (mode incognito peut aider)

---

## Pour Utiliser les Boutons OAuth

### Dans vos pages login/register:

```tsx
import { SocialAuthButtons } from '@/components/SocialAuthButtons';

export default function LoginPage() {
  return (
    <div>
      {/* Votre formulaire d'email/password */}
      
      {/* Ajouter les boutons OAuth */}
      <SocialAuthButtons />
    </div>
  );
}
```

Le composant gère automatiquement:
- Le redirection vers le provider
- La création de la session
- Les loading states
- La redirection après authentification

---

## Sécurité

✅ Bonnes pratiques:
- Les secrets sont dans `.env.local` (jamais commiter dans git)
- Les redirect URIs sont spécifiques au provider
- Les sessions utilisent HTTP-only cookies (plus sûr que localStorage)
- Les tokens OAuth sont stockés de manière sécurisée dans la DB

⚠️ À faire:
- En production, utiliser HTTPS uniquement
- Valider que les utilisateurs OAuth ont un email unique
- Implémenter les rôles (Admin, Client, etc.) pour les users OAuth
- Ajouter une étape de "linking" pour connecter OAuth à un compte existant
