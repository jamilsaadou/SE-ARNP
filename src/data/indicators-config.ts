import { IndicateurConfig } from '@/types'

export const indicatorConfigs: Record<string, IndicateurConfig> = {
  auth_prof_sante: {
    libelle: "Autorisations d'exercice professions de santé",
    responsable: "DG",
    frequence: 'mensuelle',
    unite: "Nombre",
    type: "Proportion (%)",
    formule: "(Nombre des dossiers ayant obtenu l'autorisation / Nombre total de dossiers de demande) × 100",
    methode: "Analyse des PV des réunions des comités + Compilation du registre d'enregistrement",
    fields: ["numerateur", "denominateur"],
    validation: { min: 0, max: 200, type: "percentage" },
    hints: {
      planned: "Objectif mensuel de dossiers à traiter",
      actual: "Nombre réel de dossiers traités ce mois"
    }
  },
  licences_etabl: {
    libelle: "Licences d'ouverture établissements pharmaceutiques", 
    responsable: "DOL",
    frequence: 'mensuelle',
    unite: "Pourcentage (%)",
    type: "Proportion",
    formule: "(Nombre de licences accordées / Nombre de demandes reçues) × 100",
    methode: "Analyse des PV des comités + Registre d'enregistrement des demandes",
    fields: ["numerateur", "denominateur"],
    validation: { min: 0, max: 150, type: "percentage" },
    hints: {
      planned: "Pourcentage cible de demandes à traiter",
      actual: "Pourcentage réel de licences accordées"
    }
  },
  certif_fabrication: {
    libelle: "Certificats fabrication et contrôle-qualité",
    responsable: "DOL", 
    frequence: 'trimestrielle',
    unite: "Pourcentage (%)",
    type: "Proportion",
    formule: "(Nombre de certificats accordés / Nombre de demandes reçues) × 100",
    methode: "Analyse des PV des comités + Registre des demandes de certification",
    fields: ["numerateur", "denominateur"],
    validation: { min: 0, max: 120, type: "percentage" },
    hints: {
      planned: "Objectif trimestriel (%)",
      actual: "Réalisation trimestrielle (%)"
    }
  },
  taux_procedures: {
    libelle: "Taux de respect des procédures",
    responsable: "DG/SSE",
    frequence: 'annuelle', 
    unite: "Pourcentage (%)",
    type: "Taux de conformité",
    formule: "(Nombre de procédures conformes / Total procédures auditées) × 100",
    methode: "Enquête nationale + Audit interne des procédures",
    fields: ["numerateur", "denominateur"],
    validation: { min: 70, max: 100, type: "percentage" },
    hints: {
      planned: "Seuil de conformité attendu (%)",
      actual: "Taux de conformité mesuré (%)"
    }
  },
  marge_beneficiaire: {
    libelle: "Marge bénéficiaire brute",
    responsable: "DG/SSE",
    frequence: 'annuelle',
    unite: "FCFA",
    type: "Montant financier", 
    formule: "Revenus nets - Coût des produits vendus",
    methode: "Analyse des états financiers + Comptabilité analytique",
    fields: ["revenus", "couts"],
    validation: { min: 0, max: 999999999, type: "currency" },
    hints: {
      planned: "Marge bénéficiaire prévue (FCFA)",
      actual: "Marge bénéficiaire réalisée (FCFA)"
    }
  },
  taux_erreur: {
    libelle: "Taux d'erreur de délivrance",
    responsable: "DG/SSE",
    frequence: 'annuelle',
    unite: "Pourcentage (%)",
    type: "Taux d'erreur",
    formule: "(Erreurs de délivrance / Délivrances totales) × 100", 
    methode: "Contrôle qualité + Audit des délivrances",
    fields: ["erreurs", "total-delivrances"],
    validation: { min: 0, max: 15, type: "percentage" },
    hints: {
      planned: "Seuil maximum d'erreur accepté (%)",
      actual: "Taux d'erreur réel mesuré (%)"
    }
  }
}
