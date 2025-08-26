export interface Indicateur {
  id: string;
  libelle: string;
  responsable: string;
  frequence: 'mensuelle' | 'trimestrielle' | 'annuelle';
  unite: string;
  type: string;
  formule: string;
  methode: string;
  prevu: number;
  realise: number;
  performance: number;
  statut: 'excellent' | 'satisfaisant' | 'critique';
  periode: string;
  commentaires?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndicateurConfig {
  libelle: string;
  responsable: string;
  frequence: 'mensuelle' | 'trimestrielle' | 'annuelle';
  unite: string;
  type: string;
  formule: string;
  methode: string;
  fields: string[];
  validation: {
    min: number;
    max: number;
    type: 'percentage' | 'number' | 'currency';
  };
  hints: {
    planned: string;
    actual: string;
  };
}

export interface KPI {
  id: string;
  title: string;
  value: number;
  target: number;
  performance: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description: string;
}

export interface Responsable {
  code: string;
  nom: string;
  description: string;
  indicateurs: number;
  performance: number;
}

export interface FilterState {
  responsable: string;
  frequence: string;
  statut: string;
  search: string;
}

export interface DashboardStats {
  totalIndicateurs: number;
  indicateursMensuels: number;
  tauxRealisation: number;
  alertesActives: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

export interface AlertItem {
  id: string;
  type: 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface Rapport {
  id: string;
  titre: string;
  type: 'mensuel' | 'trimestriel' | 'annuel' | 'responsable';
  frequence: string;
  responsable: string;
  destinataire: string;
  dateGeneration: Date;
  statut: 'planifie' | 'en_cours' | 'complete' | 'retard';
}
