'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, FilterX } from 'lucide-react'
import { FilterState } from '@/types'

interface FiltersSectionProps {
  onFiltersChange: (filters: FilterState) => void
  totalResults: number
}

export function FiltersSection({ onFiltersChange, totalResults }: FiltersSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    responsable: '',
    frequence: '',
    statut: '',
    search: ''
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      responsable: '',
      frequence: '',
      statut: '',
      search: ''
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Recherche */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-muted-600 mb-2">
              Recherche
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-400" />
              <Input
                placeholder="Rechercher un indicateur..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Responsable */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-muted-600 mb-2">
              Responsable
            </label>
            <Select
              value={filters.responsable}
              onChange={(e) => handleFilterChange('responsable', e.target.value)}
            >
              <option value="">Tous</option>
              <option value="DG">DG</option>
              <option value="DOL">DOL</option>
              <option value="DG/SSE">DG/SSE</option>
              <option value="Non défini">Non défini</option>
            </Select>
          </div>

          {/* Fréquence */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-muted-600 mb-2">
              Fréquence
            </label>
            <Select
              value={filters.frequence}
              onChange={(e) => handleFilterChange('frequence', e.target.value)}
            >
              <option value="">Toutes</option>
              <option value="mensuelle">Mensuelle</option>
              <option value="trimestrielle">Trimestrielle</option>
              <option value="annuelle">Annuelle</option>
            </Select>
          </div>

          {/* Statut */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-muted-600 mb-2">
              Statut
            </label>
            <Select
              value={filters.statut}
              onChange={(e) => handleFilterChange('statut', e.target.value)}
            >
              <option value="">Tous</option>
              <option value="excellent">Excellent (≥90%)</option>
              <option value="satisfaisant">Satisfaisant (70-89%)</option>
              <option value="critique">Critique (&lt;70%)</option>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <FilterX className="w-4 h-4 mr-2" />
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Résultats */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-500">
          <span>
            {totalResults} indicateur{totalResults > 1 ? 's' : ''} 
            {hasActiveFilters ? ' (filtrés)' : ''}
          </span>
          {hasActiveFilters && (
            <span className="text-niger-orange font-medium">
              Filtres actifs
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
