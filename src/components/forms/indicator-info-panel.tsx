import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import { IndicateurConfig } from '@/types'

interface IndicatorInfoPanelProps {
  config: IndicateurConfig
  show: boolean
}

export function IndicatorInfoPanel({ config, show }: IndicatorInfoPanelProps) {
  if (!show) return null

  return (
    <Card className="bg-muted-50 border-l-4 border-l-niger-orange">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Info className="w-5 h-5 text-niger-orange" />
          <span>Informations sur l'Indicateur</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-sm font-medium text-muted-600 mb-1">Responsable</div>
            <Badge variant="niger">{config.responsable}</Badge>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-600 mb-1">Fréquence</div>
            <Badge variant={`freq-${config.frequence}` as any}>{config.frequence}</Badge>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-600 mb-1">Unité</div>
            <span className="text-sm text-gray-700 ">{config.unite}</span>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-600 mb-1">Type</div>
            <span className="text-sm text-gray-700 ">{config.type}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-600 mb-2">Formule de Calcul</div>
            <div className="bg-white p-3 rounded-md border-l-4 border-l-niger-orange font-mono text-gray-700 ">
              {config.formule}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-600 mb-2">Méthode de Collecte Recommandée</div>
            <div className="text-sm text-muted-500 italic">
              {config.methode}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
