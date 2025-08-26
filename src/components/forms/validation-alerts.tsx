import { Alert, AlertDescription } from '@/components/ui/alert'

interface ValidationAlert {
  type: 'success' | 'warning' | 'danger'
  message: string
}

interface ValidationAlertsProps {
  alerts: ValidationAlert[]
}

export function ValidationAlerts({ alerts }: ValidationAlertsProps) {
  if (alerts.length === 0) return null

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.type}>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
