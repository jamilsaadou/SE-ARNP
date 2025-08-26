'use client'

import { Card, CardContent } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { 
  Clock, 
  User, 
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  Calendar as CalendarIcon,
  Eye,
  Edit
} from 'lucide-react'
import { CalendarEvent } from '../../../data/calendar-data'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface EventCardProps {
  event: CalendarEvent
  onView?: (id: string) => void
  onEdit?: (id: string) => void
}

const eventTypeConfig = {
  collecte: {
    icon: FileText,
    label: 'Collecte',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  rapport: {
    icon: FileText,
    label: 'Rapport', 
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  reunion: {
    icon: Users,
    label: 'Réunion',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  validation: {
    icon: CheckCircle2,
    label: 'Validation',
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  echeance: {
    icon: AlertTriangle,
    label: 'Échéance',
    color: 'bg-red-100 text-red-700 border-red-200'
  }
}

const statusConfig = {
  planifie: { variant: 'default' as const, text: 'Planifié' },
  en_cours: { variant: 'warning' as const, text: 'En cours' },
  complete: { variant: 'success' as const, text: 'Complété' },
  retard: { variant: 'danger' as const, text: 'En retard' }
}

const priorityConfig = {
  low: { color: 'border-l-muted-300', text: 'Faible' },
  medium: { color: 'border-l-warning', text: 'Moyenne' },
  high: { color: 'border-l-niger-orange', text: 'Élevée' },
  critical: { color: 'border-l-danger', text: 'Critique' }
}

export function EventCard({ event, onView, onEdit }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.type]
  const TypeIcon = typeConfig.icon
  const statusInfo = statusConfig[event.statut]
  const priorityInfo = priorityConfig[event.priority]

  return (
    <Card className={`hover:shadow-card-hover transition-all duration-200 border-l-4 ${priorityInfo.color}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* En-tête */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1.5 rounded-md ${typeConfig.color}`}>
                  <TypeIcon className="w-4 h-4" />
                </div>
                <Badge variant={typeConfig.label.toLowerCase() as any}>
                  {typeConfig.label}
                </Badge>
                <Badge variant={statusInfo.variant}>
                  {statusInfo.text}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-muted-900 mb-1">
                {event.title}
              </h3>
              
              <p className="text-sm text-muted-600 mb-2">
                {event.description}
              </p>
            </div>

            <div className="text-right text-xs text-muted-500">
              <div>Priorité: {priorityInfo.text}</div>
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2 text-muted-600">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {format(event.date, 'dd MMMM yyyy', { locale: fr })}
                {event.endDate && event.endDate !== event.date && (
                  <span> - {format(event.endDate, 'dd MMMM', { locale: fr })}</span>
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-600">
              <User className="w-4 h-4" />
              <span className="truncate">{event.responsable}</span>
            </div>
          </div>

          {/* Indicateurs concernés */}
          {event.indicateurs && event.indicateurs.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-500">Indicateurs:</span>
              <div className="flex flex-wrap gap-1">
                {event.indicateurs.map((ind, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-muted-100">
            <div className="text-xs text-muted-400">
              ID: {event.id}
            </div>
            
            <div className="flex space-x-1">
              {onView && (
                <Button size="sm" variant="ghost" onClick={() => onView(event.id)}>
                  <Eye className="w-3 h-3" />
                </Button>
              )}
              {onEdit && (
                <Button size="sm" variant="ghost" onClick={() => onEdit(event.id)}>
                  <Edit className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
