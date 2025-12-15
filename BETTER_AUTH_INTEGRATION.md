# Better-Auth Integration

## Architecture Overview

**Hybrid approach:** JWT handles roles, Better-Auth adds sessions + 2FA

```
┌─────────────────────────────────────────┐
│   Your Pages (login, register)          │
│   [locale]/(auth)/login/page.tsx       │
└──────────────┬──────────────────────────┘
               │ Uses AuthService
               ↓
┌─────────────────────────────────────────┐
│   JWT System (UNCHANGED)                │
│   POST /api/v1/auth/login               │
│   POST /api/v1/auth/login/admin         │
│   Returns: accessToken + refreshToken   │
└──────────────┬──────────────────────────┘
               │
         JWT Tokens (localStorage)
               │
               ↓
        Role-Based Access Control
        (Client/Admin/Deliverer/Restaurant)

┌─────────────────────────────────────────┐
│   Better-Auth (NEW - Optional)          │
│   /api/v1/auth/better/**                │
│   Sessions + 2FA + Multi-session        │
└─────────────────────────────────────────┘
```

## What Changed

### ✅ Files Configured (Minimal Changes)

- `src/lib/auth.ts` - Better-Auth server config
- `src/lib/auth-client.ts` - Better-Auth React client
- `src/lib/auth-helpers.ts` - Helper functions
- `src/app/api/v1/auth/[...all]/route.ts` - Better-Auth endpoints
- `prisma/schema.prisma` - Added Session/Account/TwoFactor models

### ✅ What Stayed the Same

- All pages work exactly as before
- AuthService.login() → JWT tokens
- useAuthStore → JWT tracking
- authLocal → localStorage management
- Role system → 4 roles still supported
- Password verification → bcrypt still works
- Token refresh → mechanism unchanged

## Setup

### 1. Environment Variables

```bash
# Generate secret (32+ chars)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env.local
BETTER_AUTH_SECRET=<generated-secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Migration

```bash
npx prisma migrate dev
```

Creates tables:
- `session` - Better-Auth sessions
- `account` - Password storage
- `two_factor` - TOTP secrets
- `verification` - Email verification

### 3. Test

```bash
yarn dev
```

Everything works as before. Better-Auth manages sessions silently.

## API Endpoints

### Existing (Unchanged)

```
POST /api/v1/auth/login
POST /api/v1/auth/login/admin
POST /api/v1/auth/register
POST /api/v1/auth/refresh
GET  /api/v1/auth/me
```

### New (Better-Auth)

```
GET  /api/v1/auth/better/session
POST /api/v1/auth/better/sign-out
POST /api/v1/auth/better/2fa/enable
POST /api/v1/auth/better/2fa/disable
POST /api/v1/auth/better/2fa/verify
```

## Using Better-Auth Features

### In React Components

```typescript
import { authClient } from "@/lib/auth-client";

export function MyComponent() {
  const { data: session } = authClient.useSession();
  
  if (!session) return <div>Not logged in</div>;
  return <div>User: {session.user.email}</div>;
}
```

### Enable 2FA

```typescript
const { data } = await authClient.twoFactor.enable();
// data contains QR code and backup codes
```

### Sign Out

```typescript
await authClient.signOut();
```

## Important Notes

- ✅ Zero breaking changes
- ✅ Pages work unchanged
- ✅ JWT tokens still authenticate API
- ✅ Better-Auth is additive only
- ✅ Can enable 2FA gradually
- ✅ Can fully migrate to Better-Auth later if needed

## Next Steps

1. Set environment variables
2. Run database migration
3. Test login pages (should work exactly as before)
4. When ready, implement 2FA in settings page
5. Later: multi-session management, passwordless login, etc.

## Support

If something breaks:
1. Check that BETTER_AUTH_SECRET is set
2. Verify database migration ran: `npx prisma migrate status`
3. Clear browser cache and localStorage
4. Restart dev server

