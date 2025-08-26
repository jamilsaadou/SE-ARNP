import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'stable'
  }
  color: 'orange' | 'blue' | 'green' | 'yellow'
  subtitle?: string
}

const colorClasses = {
  orange: 'border-t-niger-orange text-niger-orange',
  blue: 'border-t-niger-blue text-niger-blue', 
  green: 'border-t-success text-success',
  yellow: 'border-t-warning text-warning'
}

function StatCard({ title, value, change, color, subtitle }: StatCardProps) {
  const TrendIcon = change?.type === 'increase' ? TrendingUp : 
                   change?.type === 'decrease' ? TrendingDown : Minus
  
  return (
    <Card className={`border-t-4 ${colorClasses[color].split(' ')[0]}`}>
      <CardContent className="p-6">
        <div className="text-center">
          <div className={`text-3xl font-bold mb-2 ${colorClasses[color].split(' ')[1]}`}>
            {value}
          </div>
          <div className="text-gray-700 text-sm font-medium">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-gray-600 mt-1">
              {subtitle}
            </div>
          )}
          {change && (
            <div className={`flex items-center justify-center mt-2 text-xs space-x-1 ${
              change.type === 'increase' ? 'text-success' : 
              change.type === 'decrease' ? 'text-danger' : 'text-muted-500'
            }`}>
              <TrendIcon className="w-3 h-3" />
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsOverview() {
  const stats = [
    {
      title: "Indicateurs Total", 
      value: 25,
      color: 'orange' as const,
      change: { value: 0, type: 'stable' as const }
    },
    {
      title: "Indicateurs Mensuels",
      value: 19, 
      color: 'blue' as const,
      subtitle: "Collecte en cours"
    },
    {
      title: "Taux Réalisation Global",
      value: "87%",
      color: 'green' as const,
      change: { value: 3.2, type: 'increase' as const }
    },
    {
      title: "Alertes Actives", 
      value: 3,
      color: 'yellow' as const,
      subtitle: "Nécessitent attention"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
