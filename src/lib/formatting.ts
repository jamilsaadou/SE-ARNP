import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export class Formatter {
  /**
   * Formater un nombre avec séparateurs
   */
  static formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat('fr-FR', options).format(value)
  }

  /**
   * Formater un pourcentage
   */
  static formatPercentage(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`
  }

  /**
   * Formater une devise (FCFA)
   */
  static formatCurrency(value: number): string {
    return `${this.formatNumber(value)} FCFA`
  }

  /**
   * Formater une date
   */
  static formatDate(date: Date, pattern = 'dd/MM/yyyy'): string {
    return format(date, pattern, { locale: fr })
  }

  /**
   * Formater une date relative (il y a X temps)
   */
  static formatRelativeDate(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr })
  }

  /**
   * Formater le statut d'un indicateur
   */
  static formatStatus(status: string): string {
    const statusMap = {
      excellent: 'Excellent',
      satisfaisant: 'Satisfaisant', 
      critique: 'Critique'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  /**
   * Formater la fréquence
   */
  static formatFrequency(frequency: string): string {
    const frequencyMap = {
      mensuelle: 'Mensuelle',
      trimestrielle: 'Trimestrielle',
      annuelle: 'Annuelle'
    }
    return frequencyMap[frequency as keyof typeof frequencyMap] || frequency
  }

  /**
   * Truncate un texte
   */
  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  /**
   * Formater la priorité
   */
  static formatPriority(priority: string): string {
    const priorityMap = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée', 
      critical: 'Critique'
    }
    return priorityMap[priority as keyof typeof priorityMap] || priority
  }
}
