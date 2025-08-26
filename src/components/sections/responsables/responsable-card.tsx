'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Building2, 
  BarChart3, 
  Shield, 
  FileCheck, 
  Eye,
  AlertTriangle,
  TrendingUp,
  Users,
  ChevronRight
} from 'lucide-react'
import { Responsable } from '@/types'

const responsableIcons = {
  "DG": User,
  "DOL": Building2,
  "DG/SSE": BarChart3,
  "DISAC": Shield,
  "DH": FileCheck,
  "DVUE": Eye,
  "Non défini": AlertTriangle
}

interface ResponsableCardProps {
  responsable: Responsable
  onViewDetails: (code: string) => void
}

export function ResponsableCard({ responsable, onViewDetails }: ResponsableCardProps) {
  const Icon = responsableIcons[responsable.code as keyof typeof responsableIcons] || Users
  
  const getPerformanceVariant = (performance: number) => {
    if (performance === 0) return 'default'
    if (performance >= 90) return 'success'
    if (performance >= 70) return 'warning'
    return 'danger'
  }

  const getCardBorderColor = (performance: number) => {
    if (performance === 0) return 'border-l-muted-300'
    if (performance >= 90) return 'border-l-success'
    if (performance >= 70) return 'border-l-warning'
    return 'border-l-danger'
  }

  return (
    <Card className={`hover:shadow-card-hover transition-all duration-300 border-l-4 ${getCardBorderColor(responsable.performance)}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${
              responsable.performance === 0 ? 'bg-muted-100 text-muted-500' :
              responsable.performance >= 90 ? 'bg-success/10 text-success' :
              responsable.performance >= 70 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-muted-900">
                {responsable.code} - {responsable.nom}
              </div>
              <div className="text-sm text-muted-500 mt-1">
                {responsable.description}
              </div>
            </div>
          </div>
          <Badge variant={responsable.code === 'Non défini' ? 'danger' : 'niger'}>
            {responsable.code}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-niger-orange">
                {responsable.indicateurs}
              </div>
              <div className="text-xs text-muted-500">
                Indicateur{responsable.indicateurs > 1 ? 's' : ''}
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${
                responsable.performance === 0 ? 'text-muted-400' :
                responsable.performance >= 90 ? 'text-success' :
                responsable.performance >= 70 ? 'text-warning' : 'text-danger'
              }`}>
                {responsable.performance === 0 ? '--' : `${responsable.performance}%`}
              </div>
              <div className="text-xs text-muted-500">Performance</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-muted-700">
                {responsable.code === 'DG' ? '1/0' :
                 responsable.code === 'DOL' ? '2/1' :
                 responsable.code === 'DG/SSE' ? '0/3' :
                 responsable.code === 'DISAC' ? '4/2' :
                 responsable.code === 'DH' ? '2/1' :
                 responsable.code === 'DVUE' ? '3/2' :
                 'À définir'}
              </div>
              <div className="text-xs text-muted-500">M/T/A</div>
            </div>
          </div>

          {/* Barre de progression */}
          {responsable.performance > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-600">Performance globale</span>
                <span className="font-medium">{responsable.performance}%</span>
              </div>
              <Progress 
                value={responsable.performance} 
                variant={getPerformanceVariant(responsable.performance)}
                className="h-2"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-muted-100">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onViewDetails(responsable.code)}
              className="text-niger-orange hover:text-niger-600"
            >
              Voir détails
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

            {responsable.code === 'Non défini' && (
              <Button size="sm" variant="warning">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Assigner
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
