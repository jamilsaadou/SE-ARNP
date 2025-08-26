'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react'
import { Rapport } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ReportCardProps {
  rapport: Rapport
  onDownload: (id: string) => void
  onView: (id: string) => void
  onGenerate?: (id: string) => void
}

export function ReportCard({ rapport, onDownload, onView, onGenerate }: ReportCardProps) {
  const getStatusConfig = (statut: string) => {
    switch (statut) {
      case 'complete':
        return {
          icon: CheckCircle,
          variant: 'success' as const,
          text: 'Complété',
          color: 'text-success'
        }
      case 'en_cours':
        return {
          icon: Loader,
          variant: 'warning' as const, 
          text: 'En cours',
          color: 'text-warning'
        }
      case 'planifie':
        return {
          icon: Clock,
          variant: 'default' as const,
          text: 'Planifié', 
          color: 'text-muted-500'
        }
      case 'retard':
        return {
          icon: AlertCircle,
          variant: 'danger' as const,
          text: 'Retard',
          color: 'text-danger'
        }
      default:
        return {
          icon: FileText,
          variant: 'default' as const,
          text: 'Inconnu',
          color: 'text-muted-500'
        }
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'mensuel': return 'freq-mensuelle'
      case 'trimestriel': return 'freq-trimestrielle'  
      case 'annuel': return 'freq-annuelle'
      case 'responsable': return 'niger'
      default: return 'default'
    }
  }

  const statusConfig = getStatusConfig(rapport.statut)
  const StatusIcon = statusConfig.icon

  return (
    <Card className="hover:shadow-card-hover transition-all duration-300 border-l-4 border-l-niger-orange">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-niger-orange" />
              <span className="text-lg">{rapport.titre}</span>
            </CardTitle>
            
            <div className="flex items-center space-x-4 text-sm text-muted-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{rapport.frequence}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{rapport.responsable}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={getTypeVariant(rapport.type) as any}>
              {rapport.type}
            </Badge>
            <div className="flex items-center space-x-1">
              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
              <Badge variant={statusConfig.variant}>
                {statusConfig.text}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Détails */}
          <div className="text-sm text-muted-600">
            <div className="flex items-start space-x-1 mb-2">
              <Mail className="w-4 h-4 mt-0.5 text-muted-400" />
              <div>
                <span className="font-medium">Destinataire:</span>
                <div className="text-muted-500">{rapport.destinataire}</div>
              </div>
            </div>
            
            <div className="text-xs text-muted-400">
              {rapport.statut === 'planifie' 
                ? `Planifié pour ${rapport.dateGeneration.toLocaleDateString('fr-FR')}`
                : `Généré ${formatDistanceToNow(rapport.dateGeneration, { addSuffix: true, locale: fr })}`
              }
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-3 border-t border-muted-100">
            <div className="flex space-x-2">
              {rapport.statut === 'complete' && (
                <>
                  <Button size="sm" onClick={() => onView(rapport.id)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Visualiser
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDownload(rapport.id)}>
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </>
              )}
              
              {rapport.statut === 'planifie' && onGenerate && (
                <Button size="sm" variant="outline" onClick={() => onGenerate(rapport.id)}>
                  <FileText className="w-4 h-4 mr-1" />
                  Générer
                </Button>
              )}
              
              {rapport.statut === 'en_cours' && (
                <Button size="sm" variant="ghost" disabled>
                  <Loader className="w-4 h-4 mr-1 animate-spin" />
                  Génération...
                </Button>
              )}
            </div>
            
            <div className="text-xs text-muted-400">
              ID: {rapport.id}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
