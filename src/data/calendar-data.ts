export interface CalendarEvent {
  id: string
  title: string
  type: 'collecte' | 'rapport' | 'reunion' | 'validation' | 'echeance'
  date: Date
  endDate?: Date
  responsable: string
  indicateurs?: string[]
  statut: 'planifie' | 'en_cours' | 'complete' | 'retard'
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
}

export const calendarEvents: CalendarEvent[] = [
  // Avril 2025
  {
    id: 'evt_001',
    title: 'Collecte indicateurs mensuels Mars',
    type: 'collecte',
    date: new Date('2025-04-05'),
    responsable: 'Tous responsables',
    indicateurs: ['DG', 'DOL', 'DISAC'],
    statut: 'retard',
    priority: 'critical',
    description: '19 indicateurs mensuels en attente de saisie'
  },
  {
    id: 'evt_002', 
    title: 'Génération rapport mensuel Mars',
    type: 'rapport',
    date: new Date('2025-04-10'),
    responsable: 'Service Suivi-Évaluation',
    statut: 'planifie',
    priority: 'high',
    description: 'Consolidation et génération automatique du rapport mensuel'
  },
  {
    id: 'evt_003',
    title: 'Réunion performance DOL',
    type: 'reunion', 
    date: new Date('2025-04-12'),
    endDate: new Date('2025-04-12'),
    responsable: 'DOL + DG',
    statut: 'planifie',
    priority: 'medium',
    description: 'Analyse des écarts certificats fabrication (64%)'
  },
  {
    id: 'evt_004',
    title: 'Indicateurs trimestriels Q1',
    type: 'collecte',
    date: new Date('2025-04-15'),
    responsable: 'DOL + Non définis',
    indicateurs: ['certif_fabrication', 'auth_privee'],
    statut: 'planifie',
    priority: 'high',
    description: '2 indicateurs trimestriels à collecter'
  },
  {
    id: 'evt_005',
    title: 'Validation données Mars',
    type: 'validation',
    date: new Date('2025-04-08'),
    responsable: 'Directeur Général',
    statut: 'en_cours',
    priority: 'medium',
    description: 'Validation finale des données saisies'
  },
  
  // Mai 2025
  {
    id: 'evt_006',
    title: 'Collecte indicateurs mensuels Avril', 
    type: 'collecte',
    date: new Date('2025-05-05'),
    responsable: 'Tous responsables',
    statut: 'planifie',
    priority: 'high',
    description: 'Collecte régulière des 19 indicateurs mensuels'
  },
  {
    id: 'evt_007',
    title: 'Rapport semestriel S1 2025',
    type: 'rapport',
    date: new Date('2025-05-30'),
    endDate: new Date('2025-06-30'),
    responsable: 'Service Suivi-Évaluation', 
    statut: 'planifie',
    priority: 'critical',
    description: 'Préparation du rapport semestriel pour le Ministère'
  },
  {
    id: 'evt_008',
    title: 'Formation nouveaux agents DH',
    type: 'reunion',
    date: new Date('2025-05-15'),
    endDate: new Date('2025-05-17'),
    responsable: 'Direction Homologation',
    statut: 'planifie', 
    priority: 'medium',
    description: 'Formation 2 nouveaux agents pour renforcer équipe'
  },

  // Juin 2025
  {
    id: 'evt_009',
    title: 'Échéance assignation responsables',
    type: 'echeance',
    date: new Date('2025-06-01'),
    responsable: 'Direction Générale',
    statut: 'planifie',
    priority: 'critical',
    description: 'Deadline pour assigner les 4 indicateurs non définis'
  }
]
