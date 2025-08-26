'use client'

import { useState } from 'react'
import { Button } from '../../ui/button'
import { Select } from '../../ui/select'
import { Badge } from '../../ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Filter,
  Plus
} from 'lucide-react'

interface CalendarHeaderProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  view: 'month' | 'week' | 'agenda'
  onViewChange: (view: 'month' | 'week' | 'agenda') => void
  onAddEvent: () => void
  filters: {
    type: string
    responsable: string
    statut: string
  }
  onFiltersChange: (filters: any) => void
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export function CalendarHeader({ 
  currentDate, 
  onDateChange, 
  view, 
  onViewChange,
  onAddEvent,
  filters,
  onFiltersChange 
}: CalendarHeaderProps) {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    onDateChange(newDate)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  return (
    <div className="bg-white rounded-card shadow-card p-6 mb-6">
      {/* Navigation principale */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold text-muted-900 min-w-[180px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={goToToday}>
            Aujourd'hui
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sélection de vue */}
          <div className="flex bg-muted-100 rounded-lg p-1">
            {(['month', 'week', 'agenda'] as const).map((viewType) => (
              <Button
                key={viewType}
                variant={view === viewType ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange(viewType)}
                className="px-3"
              >
                {viewType === 'month' ? 'Mois' : 
                 viewType === 'week' ? 'Semaine' : 'Agenda'}
              </Button>
            ))}
          </div>
          
          <Button onClick={onAddEvent}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-500" />
          <span className="font-medium text-muted-600">Filtres:</span>
        </div>

        <Select 
          value={filters.type} 
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
        >
          <option value="">Tous types</option>
          <option value="collecte">Collectes</option>
          <option value="rapport">Rapports</option>
          <option value="reunion">Réunions</option>
          <option value="validation">Validations</option>
          <option value="echeance">Échéances</option>
        </Select>

        <Select
          value={filters.responsable}
          onChange={(e) => onFiltersChange({ ...filters, responsable: e.target.value })}
        >
          <option value="">Tous responsables</option>
          <option value="DG">Direction Générale</option>
          <option value="DOL">DOL</option>
          <option value="DISAC">DISAC</option>
          <option value="DH">Direction Homologation</option>
          <option value="Service Suivi-Évaluation">Service SE</option>
        </Select>

        <Select
          value={filters.statut}
          onChange={(e) => onFiltersChange({ ...filters, statut: e.target.value })}
        >
          <option value="">Tous statuts</option>
          <option value="planifie">Planifiés</option>
          <option value="en_cours">En cours</option>
          <option value="complete">Complétés</option>
          <option value="retard">En retard</option>
        </Select>

        {/* Indicateurs de filtre actif */}
        <div className="flex items-center space-x-2 ml-auto">
          {Object.values(filters).some(f => f !== '') && (
            <Badge variant="niger" className="text-xs">
              Filtres actifs
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
