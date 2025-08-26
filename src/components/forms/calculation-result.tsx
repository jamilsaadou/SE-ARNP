import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calculator } from 'lucide-react'

interface CalculationResultProps {
  performance: number
  gap: number
  unite: string
  show: boolean
}

export function CalculationResult({ performance, gap, unite, show }: CalculationResultProps) {
  if (!show) return null

  const statusVariant = performance >= 90 ? 'success' : 
                       performance >= 70 ? 'warning' : 'danger'
  
  const statusText = performance >= 90 ? 'Excellent' : 
                    performance >= 70 ? 'Satisfaisant' : 'Critique'

  return (
    <Card className="bg-green-50 border-l-4 border-l-success">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-success" />
          <span>Résultat du Calcul Automatique</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {performance.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-600">Taux de Réalisation</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${gap >= 0 ? 'text-success' : 'text-danger'}`}>
              {gap > 0 ? '+' : ''}{gap.toFixed(1)} {unite}
            </div>
            <div className="text-sm text-muted-600">Écart</div>
          </div>

          <div className="text-center">
            <Badge variant={statusVariant} className="text-base px-3 py-1">
              {statusText}
            </Badge>
            <div className="text-sm text-muted-600 mt-1">Statut</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
