export const APP_CONFIG = {
  name: 'ANRP Niger - Plateforme SE',
  version: '1.0.0',
  description: 'Système de suivi-évaluation pour l\'Agence Nigérienne de Régulation Pharmaceutique',
  
  // Couleurs du thème
  colors: {
    primary: '#ff6b35', // niger-orange
    secondary: '#2d5016', // niger-green
    accent: '#0071ce', // niger-blue
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8'
  },

  // Seuils de performance
  performance: {
    excellent: 90,
    satisfaisant: 70,
    critique: 0
  },

  // Configuration des graphiques
  charts: {
    colors: {
      DG: '#ff6b35',
      DOL: '#0071ce', 
      'DG/SSE': '#2d5016',
      DISAC: '#28a745',
      DH: '#ffc107',
      DVUE: '#17a2b8'
    }
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100]
  },

  // Auto-refresh
  autoRefresh: {
    interval: 5 * 60 * 1000, // 5 minutes
    dashboard: 5 * 60 * 1000,
    indicators: 10 * 60 * 1000
  },

  // Limites
  limits: {
    maxNotifications: 50,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxCommentLength: 1000
  }
} as const

export const RESPONSABLES = [
  { code: 'DG', nom: 'Direction Générale', color: '#ff6b35' },
  { code: 'DOL', nom: 'Direction Ouvertures et Licences', color: '#0071ce' },
  { code: 'DG/SSE', nom: 'Service Suivi-Évaluation', color: '#2d5016' },
  { code: 'DISAC', nom: 'Direction Inspection et Surveillance', color: '#28a745' },
  { code: 'DH', nom: 'Direction Homologation', color: '#ffc107' },
  { code: 'DVUE', nom: 'Direction Vigilance et Usages', color: '#17a2b8' }
] as const

export const FREQUENCIES = [
  { value: 'mensuelle', label: 'Mensuelle', color: '#0d6efd' },
  { value: 'trimestrielle', label: 'Trimestrielle', color: '#ffc107' },
  { value: 'annuelle', label: 'Annuelle', color: '#6c757d' }
] as const

export const STATUS_OPTIONS = [
  { value: 'excellent', label: 'Excellent (≥90%)', color: '#28a745' },
  { value: 'satisfaisant', label: 'Satisfaisant (70-89%)', color: '#ffc107' },
  { value: 'critique', label: 'Critique (<70%)', color: '#dc3545' }
] as const
