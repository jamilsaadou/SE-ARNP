# Guide de Déploiement - ANRP Platform

## 🚀 Options de Déploiement

### 1. Vercel (Recommandé)

Vercel est la plateforme recommandée pour déployer cette application Next.js.

#### Installation et Configuration
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer depuis le dossier du projet
cd anrp-platform
vercel

# Pour un déploiement en production
vercel --prod
```

#### Configuration Vercel
Créer un fichier `vercel.json` :
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["fra1"],
  "env": {
    "NEXT_PUBLIC_APP_NAME": "ANRP Niger - Plateforme SE",
    "NEXT_PUBLIC_APP_VERSION": "1.0.0"
  }
}
```

### 2. Docker

#### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  anrp-platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_NAME=ANRP Niger - Plateforme SE
      - NEXT_PUBLIC_APP_VERSION=1.0.0
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - anrp-platform
    restart: unless-stopped
```

### 3. Serveur VPS/Dédié

#### Prérequis Serveur
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install -y nodejs npm nginx certbot python3-certbot-nginx
```

#### Configuration Nginx
```nginx
# /etc/nginx/sites-available/anrp-platform
server {
    listen 80;
    server_name anrp-platform.ne www.anrp-platform.ne;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name anrp-platform.ne www.anrp-platform.ne;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/anrp-platform.ne/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/anrp-platform.ne/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

#### Déploiement Manuel
```bash
# Sur le serveur
git clone https://github.com/anrp-niger/platform-se.git
cd anrp-platform

# Installation des dépendances
npm ci --only=production

# Build de production
npm run build

# Démarrage avec PM2
npm install -g pm2
pm2 start npm --name "anrp-platform" -- start
pm2 startup
pm2 save
```

## 🔧 Configuration de Production

### Variables d'Environnement
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=ANRP Niger - Plateforme SE
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optionnel : Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/anrp_db

# Optionnel : Monitoring
SENTRY_DSN=https://your-sentry-dsn
ANALYTICS_ID=GA-XXXXXXXXX
```

### Optimisations de Performance
```javascript
// next.config.js - Optimisations additionnelles
const nextConfig = {
  // ... configuration existante
  
  // Compression
  compress: true,
  
  // Images
  images: {
    domains: ['anrp.ne', 'cdn.anrp.ne'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Headers de cache
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 📊 Monitoring et Logs

### Health Check Endpoint
Créer `src/app/api/health/route.ts` :
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    uptime: process.uptime()
  })
}
```

### Monitoring avec PM2
```bash
# Monitoring des processus
pm2 monit

# Logs en temps réel
pm2 logs anrp-platform

# Redémarrage automatique
pm2 restart anrp-platform
```

## 🔒 Sécurité en Production

### SSL/TLS avec Let's Encrypt
```bash
# Obtenir un certificat SSL
sudo certbot --nginx -d anrp-platform.ne -d www.anrp-platform.ne

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall
```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Fail2ban pour la protection contre les attaques
sudo apt install fail2ban
```

## 📈 Optimisations

### Bundle Analysis
```bash
# Analyser la taille du bundle
npm run analyze

# Optimiser les imports
# Utiliser dynamic imports pour les composants lourds
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

### Performance Monitoring
```javascript
// Intégration Web Vitals
export function reportWebVitals(metric) {
  console.log(metric)
  // Envoyer à votre service d'analytics
}
```

## 🔄 CI/CD avec GitHub Actions

Créer `.github/workflows/deploy.yml` :
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🆘 Dépannage

### Problèmes Courants

1. **Erreur de build**
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Problème de mémoire**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build
   ```

3. **Erreurs TypeScript**
   ```bash
   npm run type-check
   ```

### Logs de Debug
```bash
# Activer les logs détaillés
DEBUG=* npm run dev

# Logs de production
pm2 logs anrp-platform --lines 100
```

## 📞 Support de Déploiement

Pour toute assistance avec le déploiement :
- **Email technique**: dev@anrp.ne
- **Documentation**: [Wiki Déploiement](https://github.com/anrp-niger/platform-se/wiki/deployment)
- **Issues**: [GitHub Issues](https://github.com/anrp-niger/platform-se/issues)

---

**Dernière mise à jour**: Janvier 2025
