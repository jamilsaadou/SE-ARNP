import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

interface AdditionalFieldsProps {
  fields: string[]
  values: Record<string, string>
  onChange: (field: string, value: string) => void
  show: boolean
}

const fieldLabels = {
  numerateur: "Numérateur",
  denominateur: "Dénominateur", 
  revenus: "Revenus Nets (FCFA)",
  couts: "Coût des Produits (FCFA)",
  erreurs: "Nombre d'Erreurs",
  'total-delivrances': "Total Délivrances"
}

const fieldHints = {
  numerateur: "Valeur du numérateur pour le calcul du pourcentage",
  denominateur: "Valeur du dénominateur pour le calcul du pourcentage",
  revenus: "Montant total des revenus nets en FCFA",
  couts: "Montant total du coût des produits vendus en FCFA", 
  erreurs: "Nombre d'erreurs détectées pendant la période",
  'total-delivrances': "Nombre total de délivrances effectuées"
}

export function AdditionalFields({ fields, values, onChange, show }: AdditionalFieldsProps) {
  if (!show || fields.length === 0) return null

  return (
    <Card className="bg-blue-50 border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <PlusCircle className="w-5 h-5 text-blue-600" />
          <span>Données Complémentaires</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-muted-700">
                {fieldLabels[field as keyof typeof fieldLabels] || field}
              </label>
              <Input
                type="number"
                placeholder={`Ex: ${field === 'revenus' || field === 'couts' ? '1000000' : '10'}`}
                value={values[field] || ''}
                onChange={(e) => onChange(field, e.target.value)}
                className="bg-white"
              />
              <div className="text-xs text-muted-500">
                {fieldHints[field as keyof typeof fieldHints]}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
