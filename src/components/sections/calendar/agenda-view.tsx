'use client'

import { CalendarEvent } from '../../../data/calendar-data'
import { EventCard } from './event-card'
import { format, isSameDay, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AgendaViewProps {
  events: CalendarEvent[]
  currentDate: Date
  onViewEvent: (id: string) => void
  onEditEvent: (id: string) => void
}

export function AgendaView({ events, currentDate, onViewEvent, onEditEvent }: AgendaViewProps) {
  // Grouper les événements par date
  const groupedEvents = events.reduce((groups, event) => {
    const dateKey = format(event.date, 'yyyy-MM-dd')
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(event)
    return groups
  }, {} as Record<string, CalendarEvent[]>)

  // Trier les dates
  const sortedDates = Object.keys(groupedEvents).sort()

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-400 mb-2">Aucun événement trouvé</div>
        <div className="text-sm text-muted-500">
          Modifiez vos filtres pour voir plus d'événements
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {sortedDates.map(dateKey => {
        const date = new Date(dateKey)
        const dayEvents = groupedEvents[dateKey]
        const isToday = isSameDay(date, new Date())
        const isPast = date < startOfDay(new Date())
        
        return (
          <div key={dateKey} className="space-y-4">
            {/* En-tête de date */}
            <div className={`flex items-center space-x-3 pb-2 border-b-2 ${
              isToday ? 'border-niger-orange' : 'border-muted-200'
            }`}>
              <div className={`text-lg font-semibold ${
                isToday ? 'text-niger-orange' : 
                isPast ? 'text-muted-500' : 'text-muted-900'
              }`}>
                {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
              </div>
              {isToday && (
                <span className="bg-niger-orange text-white text-xs px-2 py-1 rounded-full">
                  Aujourd'hui
                </span>
              )}
              <span className="text-sm text-muted-500">
                {dayEvents.length} événement{dayEvents.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Événements du jour */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dayEvents
                .sort((a, b) => {
                  // Trier par priorité puis par heure
                  const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
                  return priorityOrder[b.priority] - priorityOrder[a.priority]
                })
                .map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onView={onViewEvent}
                    onEdit={onEditEvent}
                  />
                ))
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}
