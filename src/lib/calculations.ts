export class IndicatorCalculator {
  /**
   * Calculer la performance d'un indicateur
   */
  static calculatePerformance(realise: number, prevu: number): number {
    if (prevu === 0) return 0
    return Math.round((realise / prevu) * 100 * 10) / 10
  }

  /**
   * Déterminer le statut basé sur la performance
   */
  static getStatus(performance: number): 'excellent' | 'satisfaisant' | 'critique' {
    if (performance >= 90) return 'excellent'
    if (performance >= 70) return 'satisfaisant'
    return 'critique'
  }

  /**
   * Calculer le pourcentage à partir de numérateur/dénominateur
   */
  static calculatePercentage(numerateur: number, denominateur: number): number {
    if (denominateur === 0) return 0
    return Math.round((numerateur / denominateur) * 100 * 10) / 10
  }

  /**
   * Calculer la marge bénéficiaire
   */
  static calculateMargin(revenus: number, couts: number): number {
    return revenus - couts
  }

  /**
   * Calculer le taux d'erreur
   */
  static calculateErrorRate(erreurs: number, total: number): number {
    return this.calculatePercentage(erreurs, total)
  }

  /**
   * Valider une valeur selon les critères de validation
   */
  static validateValue(
    value: number,
    validation: { min: number; max: number; type: string }
  ): { isValid: boolean; warnings: string[] } {
    const warnings: string[] = []
    let isValid = true

    if (value < validation.min) {
      warnings.push(`Valeur trop faible (minimum: ${validation.min})`)
      isValid = false
    }

    if (value > validation.max) {
      warnings.push(`Valeur élevée (maximum recommandé: ${validation.max})`)
      // Pas forcément invalide, juste un avertissement
    }

    return { isValid, warnings }
  }

  /**
   * Calculer la tendance entre deux valeurs
   */
  static calculateTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    const threshold = 2 // Seuil de 2% pour considérer comme stable
    const percentChange = ((current - previous) / previous) * 100

    if (Math.abs(percentChange) <= threshold) return 'stable'
    return percentChange > 0 ? 'up' : 'down'
  }
}
