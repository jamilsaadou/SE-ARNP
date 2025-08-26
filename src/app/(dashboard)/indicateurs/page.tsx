'use client'

import { useState, useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { FiltersSection } from '@/components/sections/indicators/filters-section'
import { IndicatorsTable } from '@/components/sections/indicators/indicators-table'
import { indicatorsData } from '@/data/indicators-data'
import { FilterState } from '@/types'

export default function IndicateursPage() {
  const [filters, setFilters] = useState<FilterState>({
    responsable: '',
    frequence: '',
    statut: '',
    search: ''
  })

  const filteredIndicators = useMemo(() => {
    return indicatorsData.filter(indicator => {
      // Filtre par responsable
      if (filters.responsable && indicator.responsable !== filters.responsable) {
        return false
      }

      // Filtre par fréquence
      if (filters.frequence && indicator.frequence !== filters.frequence) {
        return false
      }

      // Filtre par statut
      if (filters.statut && indicator.statut !== filters.statut) {
        return false
      }

      // Filtre par recherche
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesLibelle = indicator.libelle.toLowerCase().includes(searchTerm)
        const matchesResponsable = indicator.responsable.toLowerCase().includes(searchTerm)
        const matchesType = indicator.type.toLowerCase().includes(searchTerm)
        
        if (!matchesLibelle && !matchesResponsable && !matchesType) {
          return false
        }
      }

      return true
    })
  }, [filters])

  return (
    <div className="animate-fade-in space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-niger-orange" />
          <span>Suivi des 25 Indicateurs ANRP</span>
        </h1>
        <p className="mt-2 text-muted-500 text-lg">
          Vue détaillée de tous les indicateurs de performance avec filtres avancés
        </p>
      </div>

      {/* Filtres */}
      <FiltersSection 
        onFiltersChange={setFilters}
        totalResults={filteredIndicators.length}
      />

      {/* Tableau des indicateurs */}
      <IndicatorsTable indicators={filteredIndicators} />
    </div>
  )
}
