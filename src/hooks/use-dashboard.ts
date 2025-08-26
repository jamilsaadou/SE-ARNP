'use client'

import { useState, useEffect } from 'react'
import { useDashboardStore } from '../stores/dashboard-store'
import { useIndicatorsStore } from '../stores/indicators-store'

export function useDashboard() {
  const [refreshing, setRefreshing] = useState(false)
  
  const {
    kpis,
    performanceChartData,
    frequencyChartData,
    globalStats,
    isLoadingKPIs,
    isLoadingCharts,
    lastUpdated,
    updateKPIs,
    refreshDashboard
  } = useDashboardStore()

  const { getStats } = useIndicatorsStore()

  // Auto-refresh toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh()
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    if (refreshing) return
    
    setRefreshing(true)
    try {
      await refreshDashboard()
    } finally {
      setRefreshing(false)
    }
  }

  // Calculer les KPIs en temps réel basés sur les indicateurs
  const liveKPIs = () => {
    const stats = getStats()
    
    return kpis.map(kpi => ({
      ...kpi,
      // Mettre à jour avec les vraies données si disponible
      lastUpdated: new Date()
    }))
  }

  return {
    kpis: liveKPIs(),
    performanceChartData,
    frequencyChartData,
    globalStats,
    isLoading: isLoadingKPIs || isLoadingCharts || refreshing,
    lastUpdated,
    refresh: handleRefresh
  }
}
