import { Rapport } from '@/types'

export const reportsData: Rapport[] = [
  {
    id: 'rpt_001',
    titre: 'Rapport Mensuel - Mars 2025',
    type: 'mensuel',
    frequence: 'Généré le 01/04/2025',
    responsable: 'Système automatique',
    destinataire: 'Direction Générale, Conseil d\'Administration',
    dateGeneration: new Date('2025-04-01'),
    statut: 'complete'
  },
  {
    id: 'rpt_002', 
    titre: 'Rapport par Responsable - DOL',
    type: 'responsable',
    frequence: 'Sur demande',
    responsable: 'Direction Ouvertures et Licences',
    destinataire: 'DG, Service Suivi-Évaluation',
    dateGeneration: new Date('2025-03-25'),
    statut: 'complete'
  },
  {
    id: 'rpt_003',
    titre: 'Analyse des Écarts - T1 2025', 
    type: 'trimestriel',
    frequence: 'Fin de trimestre',
    responsable: 'Service Suivi-Évaluation',
    destinataire: 'Comité de Direction',
    dateGeneration: new Date('2025-03-31'),
    statut: 'complete'
  },
  {
    id: 'rpt_004',
    titre: 'Tableau de Bord Exécutif - Mars 2025',
    type: 'mensuel', 
    frequence: 'Temps réel',
    responsable: 'Plateforme SE',
    destinataire: 'Direction/Conseil d\'Administration',
    dateGeneration: new Date('2025-03-30'),
    statut: 'complete'
  },
  {
    id: 'rpt_005',
    titre: 'Rapport Semestriel S1-2025',
    type: 'annuel',
    frequence: '30 juin 2025', 
    responsable: 'Service Suivi-Évaluation',
    destinataire: 'Ministère de la Santé',
    dateGeneration: new Date('2025-06-30'),
    statut: 'planifie'
  },
  {
    id: 'rpt_006',
    titre: 'Performance DISAC - Mars 2025',
    type: 'responsable',
    frequence: 'Mensuel',
    responsable: 'DISAC',
    destinataire: 'DG, DOL',
    dateGeneration: new Date('2025-03-28'),
    statut: 'en_cours'
  }
]
