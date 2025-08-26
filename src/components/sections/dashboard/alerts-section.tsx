import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"

export function AlertsSection() {
  const alerts = [
    {
      type: 'danger' as const,
      title: 'Action urgente :',
      message: 'Certificats de fabrication (DOL) : 64% de réalisation - Objectif trimestriel en danger'
    },
    {
      type: 'warning' as const,
      title: 'Échéance proche :',
      message: '5 indicateurs mensuels en attente de saisie - Date limite : 05 avril'
    },
    {
      type: 'success' as const,
      title: 'Objectif dépassé :',
      message: 'Licences d\'établissements (DOL) : 117% de réalisation ce mois'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-niger-orange" />
          <span>Alertes & Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.type}>
            <AlertDescription>
              <strong>{alert.title}</strong> {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
