# ANRP Niger - Plateforme de Suivi-Évaluation

## 📋 Description

Plateforme web moderne de suivi-évaluation pour l'Agence Nigérienne de Régulation Pharmaceutique (ANRP). Cette application permet la gestion, le suivi et l'analyse des indicateurs de performance de l'agence.

## 🚀 Fonctionnalités

### 📊 Tableau de Bord
- Vue d'ensemble des KPIs principaux
- Graphiques de performance par responsable
- Alertes et notifications en temps réel
- Statistiques globales de l'agence

### 📈 Gestion des Indicateurs
- 25 indicateurs de performance (19 mensuels, 2 trimestriels, 4 annuels)
- Filtrage avancé par responsable, fréquence, statut
- Calcul automatique des performances
- Validation et commentaires

### 👥 Suivi par Responsable
- Direction Générale (DG)
- Direction Ouvertures et Licences (DOL)
- Direction Inspection et Surveillance (DISAC)
- Direction Homologation (DH)
- Service Suivi-Évaluation (DG/SSE)

### 📝 Saisie de Données
- Interface intuitive de saisie
- Validation en temps réel
- Calculs automatiques
- Gestion des champs additionnels

### 📑 Génération de Rapports
- Rapports mensuels, trimestriels, annuels
- Export PDF et Excel
- Templates personnalisables
- Historique des rapports

### 📅 Calendrier de Rapportage
- Planning des collectes de données
- Échéances et rappels
- Gestion des événements
- Vue agenda et mensuelle

## 🛠️ Technologies

- **Framework**: Next.js 15.5.0 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand avec Immer
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **UI Components**: Radix UI

## 📦 Installation

### Prérequis
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation locale
```bash
# Cloner le repository
git clone https://github.com/anrp-niger/platform-se.git
cd anrp-platform

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🏗️ Architecture

```
src/
├── app/                    # Pages Next.js App Router
│   ├── (dashboard)/       # Groupe de routes dashboard
│   │   ├── dashboard/     # Page d'accueil
│   │   ├── indicateurs/   # Gestion des indicateurs
│   │   ├── responsables/  # Vue par responsable
│   │   ├── saisie/        # Saisie de données
│   │   ├── rapports/      # Génération de rapports
│   │   └── calendrier/    # Planning et échéances
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout racine
│   ├── loading.tsx        # Page de chargement
│   ├── error.tsx          # Page d'erreur
│   └── not-found.tsx      # Page 404
├── components/
│   ├── ui/                # Composants UI de base
│   ├── layout/            # Composants de layout
│   ├── sections/          # Sections spécialisées
│   ├── charts/            # Composants de graphiques
│   ├── forms/             # Composants de formulaires
│   └── providers/         # Providers React
├── data/                  # Données statiques et mock
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires et helpers
├── stores/                # Stores Zustand
└── types/                 # Définitions TypeScript
```

## 🎨 Design System

### Couleurs
- **Primary**: `#ff6b35` (Niger Orange)
- **Secondary**: `#2d5016` (Niger Green)
- **Accent**: `#0071ce` (Niger Blue)

### Composants UI
- Système de design cohérent avec Tailwind CSS
- Composants réutilisables basés sur Radix UI
- Thème personnalisé aux couleurs du Niger

## 📊 Gestion d'État

### Stores Zustand
- **indicators-store**: Gestion des indicateurs
- **filters-store**: Filtres globaux
- **app-store**: État de l'application et notifications
- **dashboard-store**: KPIs et données des graphiques

### Persistance
- LocalStorage pour les préférences utilisateur
- Zustand persist middleware pour les données critiques

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build           # Build de production
npm run start           # Serveur de production

# Qualité de code
npm run lint            # Vérification ESLint
npm run lint:fix        # Correction automatique
npm run type-check      # Vérification TypeScript
npm run format          # Formatage Prettier

# Tests
npm run test            # Tests unitaires
npm run test:watch      # Tests en mode watch
npm run test:coverage   # Couverture de tests

# Utilitaires
npm run analyze         # Analyse du bundle
npm run clean           # Nettoyage des builds
```

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables d'Environnement
```env
NEXT_PUBLIC_APP_NAME=ANRP Niger - Plateforme SE
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

## 📈 Performance

- **Lighthouse Score**: 95+
- **Bundle Size**: Optimisé avec code splitting
- **Loading Time**: < 2s sur 3G
- **SEO**: Optimisé pour les moteurs de recherche

## 🔒 Sécurité

- Headers de sécurité configurés
- Protection CSRF
- Validation côté client et serveur
- Sanitisation des données

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📞 Support

- **Email**: contact@anrp.ne
- **Issues**: [GitHub Issues](https://github.com/anrp-niger/platform-se/issues)
- **Documentation**: [Wiki du projet](https://github.com/anrp-niger/platform-se/wiki)

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🏢 À propos de l'ANRP

L'Agence Nigérienne de Régulation Pharmaceutique (ANRP) est l'autorité de régulation pharmaceutique du Niger, responsable de :

- L'autorisation de mise sur le marché des médicaments
- L'inspection et la surveillance du secteur pharmaceutique
- La délivrance des licences d'établissements
- L'homologation des produits pharmaceutiques
- La vigilance et la pharmacovigilance

---

**Version**: 1.0.0  
**Dernière mise à jour**: Janvier 2025  
**Développé avec ❤️ pour l'ANRP Niger**
