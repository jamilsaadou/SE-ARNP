'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Indicateur } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface IndicatorsTableProps {
  indicators: Indicateur[]
}

export function IndicatorsTable({ indicators }: IndicatorsTableProps) {
  const getStatusVariant = (statut: string) => {
    switch (statut) {
      case 'excellent':
        return 'success'
      case 'satisfaisant':
        return 'warning'
      case 'critique':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getFrequenceVariant = (frequence: string) => {
    switch (frequence) {
      case 'mensuelle':
        return 'freq-mensuelle'
      case 'trimestrielle':
        return 'freq-trimestrielle'
      case 'annuelle':
        return 'freq-annuelle'
      default:
        return 'default'
    }
  }

  const getProgressVariant = (performance: number) => {
    if (performance >= 90) return 'success'
    if (performance >= 70) return 'warning'
    return 'danger'
  }

  if (indicators.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-500">Aucun indicateur trouvé avec les critères sélectionnés.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-niger-green text-white">
              <th className="text-left p-4 font-medium">Indicateur</th>
              <th className="text-left p-4 font-medium">Responsable</th>
              <th className="text-left p-4 font-medium">Fréquence</th>
              <th className="text-right p-4 font-medium">Prévu</th>
              <th className="text-right p-4 font-medium">Réalisé</th>
              <th className="text-left p-4 font-medium">Performance</th>
              <th className="text-left p-4 font-medium">Statut</th>
              <th className="text-left p-4 font-medium">Mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator, index) => (
              <tr 
                key={indicator.id} 
                className={`border-b border-muted-100 hover:bg-muted-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-muted-25'
                }`}
              >
                <td className="p-4">
                  <div>
                    <div className="font-medium text-muted-900 mb-1">
                      {indicator.libelle}
                    </div>
                    <div className="text-xs text-muted-500">
                      {indicator.type} • {indicator.unite}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={indicator.responsable === 'Non défini' ? 'danger' : 'niger'}>
                    {indicator.responsable}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={getFrequenceVariant(indicator.frequence) as any}>
                    {indicator.frequence}
                  </Badge>
                </td>
                <td className="p-4 text-right font-medium text-gray-700 ">
                  {indicator.prevu}
                </td>
                <td className="p-4 text-right font-medium text-gray-700 ">
                  {indicator.realise}
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(indicator.performance, 100)} 
                      variant={getProgressVariant(indicator.performance)}
                      className="h-2"
                    />
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {indicator.performance}%
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={getStatusVariant(indicator.statut) as any}>
                    {indicator.statut === 'excellent' ? 'Excellent' :
                     indicator.statut === 'satisfaisant' ? 'Satisfaisant' : 'Critique'}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="text-xs text-muted-500">
                    {formatDistanceToNow(indicator.updatedAt, { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </div>
                  <div className="text-xs text-muted-400">
                    {indicator.periode}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
