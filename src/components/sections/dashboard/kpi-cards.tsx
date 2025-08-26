import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  FileCheck, 
  Award, 
  Users,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

interface KPICardProps {
  title: string
  value: number
  target: number
  performance: number
  trend: 'up' | 'down' | 'stable'
  icon: 'building' | 'file' | 'award' | 'users'
  description: string
  responsable: string
}

const icons = {
  building: Building2,
  file: FileCheck, 
  award: Award,
  users: Users
}

const iconColors = {
  building: 'bg-niger-blue',
  file: 'bg-niger-orange',
  award: 'bg-success', 
  users: 'bg-warning'
}

export function KPICard({ 
  title, 
  value, 
  target, 
  performance, 
  trend, 
  icon, 
  description,
  responsable 
}: KPICardProps) {
  const Icon = icons[icon]
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  
  const progressVariant = performance >= 90 ? 'success' : 
                         performance >= 70 ? 'warning' : 'danger'
  
  const trendColor = trend === 'up' ? 'text-success' : 
                     trend === 'down' ? 'text-danger' : 'text-muted-500'

  return (
    <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className={`w-12 h-12 rounded-full ${iconColors[icon]} flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <Badge variant="outline" className="text-xs">
          {responsable}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-sm font-medium text-gray-700 mb-2">
          {title}
        </CardTitle>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {performance}%
        </div>
        <div className="space-y-2">
          <Progress value={performance} variant={progressVariant} />
          <div className={`flex items-center space-x-2 text-sm ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span>{description}</span>
          </div>
          <div className="text-xs text-gray-600">
            {value}/{target} {title.includes('%') ? '' : 'dossiers'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPISection() {
  const kpis = [
    {
      title: "Autorisations d'Exercice",
      value: 39,
      target: 45, 
      performance: 87,
      trend: 'up' as const,
      icon: 'users' as const,
      description: "39/45 dossiers traités",
      responsable: "DG"
    },
    {
      title: "Licences Établissements", 
      value: 14,
      target: 12,
      performance: 117,
      trend: 'up' as const,
      icon: 'building' as const,
      description: "Objectif dépassé",
      responsable: "DOL"
    },
    {
      title: "Certificats Fabrication",
      value: 18,
      target: 28, 
      performance: 64,
      trend: 'down' as const,
      icon: 'file' as const,
      description: "Retard sur objectifs",
      responsable: "DOL"
    },
    {
      title: "Bonnes Pratiques",
      value: 13,
      target: 15,
      performance: 87,
      trend: 'stable' as const, 
      icon: 'award' as const,
      description: "Performance stable",
      responsable: "DOL"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  )
}
