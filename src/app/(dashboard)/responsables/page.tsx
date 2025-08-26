'use client'

import { useState } from 'react'
import { Users, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ResponsableCard } from '@/components/sections/responsables/responsable-card'
import { ResponsablePerformanceChart } from '@/components/charts/responsable-performance-chart'
import { IndicatorsDistributionChart } from '@/components/charts/indicators-distribution-chart'
import { PriorityActions } from '@/components/sections/responsables/priority-actions'
import { responsablesData } from '@/data/responsables-data'

export default function ResponsablesPage() {
  const [sortBy, setSortBy] = useState('performance')
  const [filterBy, setFilterBy] = useState('all')

  const handleViewDetails = (code: string) => {
    console.log('Voir détails pour:', code)
    // Ici on pourrait naviguer vers une page de détail ou ouvrir un modal
    alert(`Affichage des détails pour ${code}`)
  }

  // Filtrer et trier les responsables
  const filteredAndSortedResponsables = responsablesData
    .filter(resp => {
      if (filterBy === 'all') return true
      if (filterBy === 'assigned') return resp.code !== 'Non défini'
      if (filterBy === 'unassigned') return resp.code === 'Non défini'
      if (filterBy === 'high-performance') return resp.performance >= 90
      if (filterBy === 'low-performance') return resp.performance > 0 && resp.performance < 80
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'performance') return b.performance - a.performance
      if (sortBy === 'indicators') return b.indicateurs - a.indicateurs
      if (sortBy === 'name') return a.nom.localeCompare(b.nom)
      return 0
    })

  return (
    <div className="animate-fade-in space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
          <Users className="w-8 h-8 text-niger-orange" />
          <span>Suivi par Responsable</span>
        </h1>
        <p className="mt-2 text-muted-500 text-lg">
          Vue d'ensemble des performances par direction et service
        </p>
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-card shadow-card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-500" />
            <span className="text-sm font-medium text-muted-600">Filtres:</span>
          </div>
          
          <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="all">Tous les responsables</option>
            <option value="assigned">Responsables assignés</option>
            <option value="unassigned">Non assignés</option>
            <option value="high-performance">Performance élevée (≥90%)</option>
            <option value="low-performance">Performance faible (&lt;80%)</option>
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="performance">Trier par performance</option>
            <option value="indicators">Trier par nb indicateurs</option>
            <option value="name">Trier par nom</option>
          </Select>
        </div>

        <div className="text-sm text-muted-500">
          {filteredAndSortedResponsables.length} responsable{filteredAndSortedResponsables.length > 1 ? 's' : ''} affiché{filteredAndSortedResponsables.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Cartes des responsables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedResponsables.map((responsable) => (
          <ResponsableCard
            key={responsable.code}
            responsable={responsable}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsablePerformanceChart />
        <IndicatorsDistributionChart />
      </div>

      {/* Actions prioritaires */}
      <PriorityActions />
    </div>
  )
}
