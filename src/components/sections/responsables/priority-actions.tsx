import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, CheckCircle, UserPlus } from 'lucide-react'

export function PriorityActions() {
  const actions = [
    {
      type: 'danger' as const,
      icon: AlertTriangle,
      title: 'Urgent',
      message: 'Assigner responsables pour 4 indicateurs non définis',
      action: 'Assigner maintenant'
    },
    {
      type: 'warning' as const, 
      icon: Clock,
      title: 'Cette semaine',
      message: 'DVUE : Performance 78% - Nécessite plan d\'amélioration',
      action: 'Planifier réunion'
    },
    {
      type: 'info' as const,
      icon: UserPlus,
      title: 'Recommandation',
      message: 'Former 2 nouveaux agents DH pour renforcer l\'équipe homologation',
      action: 'Voir planning'
    },
    {
      type: 'success' as const,
      icon: CheckCircle, 
      title: 'Complété',
      message: 'DG/SSE : Objectifs T1 atteints (92% performance)',
      action: 'Voir rapport'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-niger-orange" />
          <span>Actions Prioritaires</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Alert key={index} variant={action.type}>
                <Icon className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>{action.title}:</strong> {action.message}
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4 text-xs">
                      {action.action}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
