import { Responsable } from '@/types'

export const responsablesData: Responsable[] = [
  {
    code: "DG",
    nom: "Direction Générale",
    description: "Autorisations d'exercice des professions de santé",
    indicateurs: 1,
    performance: 87
  },
  {
    code: "DOL",
    nom: "Direction Ouvertures et Licences", 
    description: "Licences établissements, Certificats fabrication, Bonnes pratiques pharmaceutiques",
    indicateurs: 3,
    performance: 89
  },
  {
    code: "DG/SSE",
    nom: "Service Suivi-Évaluation",
    description: "Taux de respect des procédures, Marge bénéficiaire, Taux d'erreur",
    indicateurs: 3,
    performance: 92
  },
  {
    code: "DISAC",
    nom: "Direction Inspection et Surveillance",
    description: "Surveillance disponibilité, contrôle prix, inspections établissements",
    indicateurs: 6,
    performance: 84
  },
  {
    code: "DH",
    nom: "Direction Homologation",
    description: "Homologations produits de santé, contrôle qualité",
    indicateurs: 3,
    performance: 91
  },
  {
    code: "DVUE",
    nom: "Direction Vigilance et Usages",
    description: "Pharmacovigilance, matériovigilance, usage rationnel",
    indicateurs: 5,
    performance: 78
  },
  {
    code: "Non défini",
    nom: "Responsables à Assigner",
    description: "Indicateurs nécessitant l'assignation de responsables",
    indicateurs: 4,
    performance: 0
  }
]
