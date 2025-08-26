'use client'

import { useState, useMemo } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { CalendarHeader } from '../../../components/sections/calendar/calendar-header'
import { AgendaView } from '../../../components/sections/calendar/agenda-view'
import { calendarEvents } from '../../../data/calendar-data'
import { isWithinInterval, startOfMonth, endOfMonth, isAfter, startOfDay } from 'date-fns'

export default function CalendrierPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('agenda')
  const [filters, setFilters] = useState({
    type: '',
    responsable: '', 
    statut: ''
  })

  const handleAddEvent = () => {
    console.log('Ajouter nouvel événement')
    alert('Fonctionnalité d\'ajout d\'événement en développement')
  }

  const handleViewEvent = (id: string) => {
    const event = calendarEvents.find(e => e.id === id)
    if (event) {
      alert(`Détails de l'événement: ${event.title}`)
    }
  }

  const handleEditEvent = (id: string) => {
    const event = calendarEvents.find(e => e.id === id)
    if (event) {
      alert(`Modifier l'événement: ${event.title}`)
    }
  }

  // Filtrer les événements
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      // Filtre par type
      if (filters.type && event.type !== filters.type) {
        return false
      }

      // Filtre par responsable
      if (filters.responsable && !event.responsable.includes(filters.responsable)) {
        return false
      }

      // Filtre par statut
      if (filters.statut && event.statut !== filters.statut) {
        return false
      }

      // Filtre par période (pour la vue mois)
      if (view === 'month') {
        const monthStart = startOfMonth(currentDate)
        const monthEnd = endOfMonth(currentDate)
        
        return isWithinInterval(event.date, {
          start: monthStart,
          end: monthEnd
        })
      }

      return true
    }).sort((a, b) => {
      // Trier par date puis par priorité
      const dateCompare = a.date.getTime() - b.date.getTime()
      if (dateCompare !== 0) return dateCompare
      
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }, [filters, view, currentDate])

  // Statistiques rapides
  const stats = useMemo(() => {
    const now = startOfDay(new Date())
    
    return {
      total: filteredEvents.length,
      enRetard: filteredEvents.filter(e => e.statut === 'retard').length,
      aVenir: filteredEvents.filter(e => isAfter(e.date, now) && e.statut === 'planifie').length,
      critique: filteredEvents.filter(e => e.priority === 'critical').length
    }
  }, [filteredEvents])

  return (
    <div className="animate-fade-in space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
          <CalendarIcon className="w-8 h-8 text-niger-orange" />
          <span>Calendrier de Rapportage</span>
        </h1>
        <p className="mt-2 text-muted-500 text-lg">
          Planning des collectes, rapports et échéances de suivi-évaluation
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card shadow-card text-center">
          <div className="text-2xl font-bold text-niger-orange">{stats.total}</div>
          <div className="text-sm text-muted-500">Total événements</div>
        </div>
        <div className="bg-white p-4 rounded-card shadow-card text-center">
          <div className="text-2xl font-bold text-danger">{stats.enRetard}</div>
          <div className="text-sm text-muted-500">En retard</div>
        </div>
        <div className="bg-white p-4 rounded-card shadow-card text-center">
          <div className="text-2xl font-bold text-success">{stats.aVenir}</div>
          <div className="text-sm text-muted-500">À venir</div>
        </div>
        <div className="bg-white p-4 rounded-card shadow-card text-center">
          <div className="text-2xl font-bold text-warning">{stats.critique}</div>
          <div className="text-sm text-muted-500">Critiques</div>
        </div>
      </div>

      {/* En-tête du calendrier */}
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        view={view}
        onViewChange={setView}
        onAddEvent={handleAddEvent}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Vue agenda */}
      <AgendaView
        events={filteredEvents}
        currentDate={currentDate}
        onViewEvent={handleViewEvent}
        onEditEvent={handleEditEvent}
      />
    </div>
  )
}
