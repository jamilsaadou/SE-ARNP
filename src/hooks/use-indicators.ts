'use client'

import { useState, useEffect, useMemo } from 'react'
import { useIndicatorsStore } from '../stores/indicators-store'
import { useFiltersStore } from '../stores/filters-store'
import { Indicateur } from '../types'

export function useIndicators() {
  const {
    indicators,
    selectedIndicator,
    isLoading,
    error,
    fetchIndicators,
    saveIndicator,
    updateIndicator,
    deleteIndicator,
    selectIndicator,
    getStats,
    recalculatePerformances
  } = useIndicatorsStore()

  const { indicatorFilters } = useFiltersStore()

  // Indicateurs filtrés
  const filteredIndicators = useMemo(() => {
    return indicators.filter(indicator => {
      // Filtre par responsable
      if (indicatorFilters.responsable && indicator.responsable !== indicatorFilters.responsable) {
        return false
      }

      // Filtre par fréquence
      if (indicatorFilters.frequence && indicator.frequence !== indicatorFilters.frequence) {
        return false
      }

      // Filtre par statut
      if (indicatorFilters.statut && indicator.statut !== indicatorFilters.statut) {
        return false
      }

      // Filtre par période
      if (indicatorFilters.periode && indicator.periode !== indicatorFilters.periode) {
        return false
      }

      // Recherche textuelle
      if (indicatorFilters.search) {
        const searchTerm = indicatorFilters.search.toLowerCase()
        const matchesLibelle = indicator.libelle.toLowerCase().includes(searchTerm)
        const matchesResponsable = indicator.responsable.toLowerCase().includes(searchTerm)
        const matchesType = indicator.type.toLowerCase().includes(searchTerm)
        
        if (!matchesLibelle && !matchesResponsable && !matchesType) {
          return false
        }
      }

      return true
    })
  }, [indicators, indicatorFilters])

  // Statistiques des indicateurs filtrés
  const filteredStats = useMemo(() => {
    const total = filteredIndicators.length
    const byStatut = filteredIndicators.reduce((acc, ind) => {
      acc[ind.statut] = (acc[ind.statut] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalPerformance = filteredIndicators.reduce((sum, ind) => sum + ind.performance, 0)
    const averagePerformance = total > 0 ? totalPerformance / total : 0

    return {
      total,
      excellent: byStatut.excellent || 0,
      satisfaisant: byStatut.satisfaisant || 0,
      critique: byStatut.critique || 0,
      averagePerformance: Math.round(averagePerformance * 10) / 10
    }
  }, [filteredIndicators])

  return {
    indicators: filteredIndicators,
    allIndicators: indicators,
    selectedIndicator: selectedIndicator ? indicators.find(i => i.id === selectedIndicator) : null,
    isLoading,
    error,
    stats: filteredStats,
    globalStats: getStats(),
    
    // Actions
    fetchIndicators,
    saveIndicator,
    updateIndicator,
    deleteIndicator,
    selectIndicator,
    recalculatePerformances
  }
}
