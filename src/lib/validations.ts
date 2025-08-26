export class ValidationRules {
  /**
   * Valider un email
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Valider un indicateur
   */
  static validateIndicator(data: {
    libelle: string
    responsable: string
    prevu: number
    realise: number
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.libelle || data.libelle.trim().length < 3) {
      errors.push('Le libellé doit contenir au moins 3 caractères')
    }

    if (!data.responsable || data.responsable === 'Non défini') {
      errors.push('Un responsable doit être assigné')
    }

    if (data.prevu <= 0) {
      errors.push('La valeur prévue doit être positive')
    }

    if (data.realise < 0) {
      errors.push('La valeur réalisée ne peut pas être négative')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Valider une période
   */
  static validatePeriod(periode: string, frequence: string): boolean {
    if (!periode) return false

    switch (frequence) {
      case 'mensuelle':
        return /^\d{4}-\d{2}$/.test(periode) // Format: 2025-03
      case 'trimestrielle':
        return /^\d{4}-Q[1-4]$/.test(periode) // Format: 2025-Q1
      case 'annuelle':
        return /^\d{4}$/.test(periode) // Format: 2025
      default:
        return true
    }
  }

  /**
   * Valider un fichier uploadé
   */
  static validateFile(
    file: File,
    options: {
      maxSize?: number // en bytes
      allowedTypes?: string[]
    } = {}
  ): { isValid: boolean; error?: string } {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = ['application/pdf', 'application/vnd.ms-excel'] } = options

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `Le fichier est trop volumineux (max: ${Math.round(maxSize / 1024 / 1024)}MB)`
      }
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Type de fichier non autorisé (autorisés: ${allowedTypes.join(', ')})`
      }
    }

    return { isValid: true }
  }
}
