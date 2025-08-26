'use client'

import { useState, useEffect } from 'react'
import { Keyboard, Save, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { indicatorConfigs } from '@/data/indicators-config'
import { IndicatorInfoPanel } from '@/components/forms/indicator-info-panel'
import { AdditionalFields } from '@/components/forms/additional-fields'
import { ValidationAlerts } from '@/components/forms/validation-alerts'
import { CalculationResult } from '@/components/forms/calculation-result'

interface ValidationAlert {
  type: 'success' | 'warning' | 'danger'
  message: string
}

export default function SaisiePage() {
  const [selectedIndicator, setSelectedIndicator] = useState('')
  const [formData, setFormData] = useState({
    planned: '',
    actual: '',
    period: '2025-03',
    method: '',
    comments: '',
    additionalFields: {} as Record<string, string>
  })
  const [validationAlerts, setValidationAlerts] = useState<ValidationAlert[]>([])
  const [calculationResult, setCalculationResult] = useState<{
    performance: number
    gap: number
    show: boolean
  }>({ performance: 0, gap: 0, show: false })

  const config = selectedIndicator ? indicatorConfigs[selectedIndicator] : null

  // Calculer automatiquement quand les valeurs changent
  useEffect(() => {
    if (config && formData.planned && formData.actual) {
      const planned = parseFloat(formData.planned)
      const actual = parseFloat(formData.actual)
      
      if (!isNaN(planned) && !isNaN(actual) && planned > 0) {
        const performance = (actual / planned) * 100
        const gap = actual - planned
        
        setCalculationResult({
          performance,
          gap,
          show: true
        })

        // Validation automatique
        validateData(actual, config)
      }
    } else {
      setCalculationResult(prev => ({ ...prev, show: false }))
      setValidationAlerts([])
    }
  }, [formData.planned, formData.actual, config])

  const validateData = (value: number, config: any) => {
    const alerts: ValidationAlert[] = []

    if (config.validation) {
      if (value < config.validation.min) {
        alerts.push({
          type: 'danger',
          message: `Valeur trop faible. Minimum attendu: ${config.validation.min}${config.unite.includes('%') ? '%' : ''}`
        })
      } else if (value > config.validation.max) {
        alerts.push({
          type: 'warning',
          message: `Valeur élevée. Maximum habituel: ${config.validation.max}${config.unite.includes('%') ? '%' : ''}. Vérifiez les données.`
        })
      }
    }

    // Calcul automatique avec champs supplémentaires
    if (config.fields.includes('numerateur') && config.fields.includes('denominateur')) {
      const num = parseFloat(formData.additionalFields.numerateur) || 0
      const den = parseFloat(formData.additionalFields.denominateur) || 0
      
      if (num > 0 && den > 0) {
        const calculated = (num / den) * 100
        setFormData(prev => ({ ...prev, actual: calculated.toFixed(1) }))
        alerts.push({
          type: 'success',
          message: `Valeur calculée automatiquement: ${calculated.toFixed(1)}% (${num}/${den})`
        })
      } else if (num > 0 && den === 0) {
        alerts.push({
          type: 'warning',
          message: 'Veuillez saisir le dénominateur pour calculer le pourcentage.'
        })
      }
    }

    setValidationAlerts(alerts)
  }

  const handleIndicatorChange = (value: string) => {
    setSelectedIndicator(value)
    setFormData({
      planned: '',
      actual: '',
      period: '2025-03',
      method: '',
      comments: '',
      additionalFields: {}
    })
    setValidationAlerts([])
    setCalculationResult({ performance: 0, gap: 0, show: false })
  }

  const handleAdditionalFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      additionalFields: {
        ...prev.additionalFields,
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    if (!selectedIndicator || !formData.planned || !formData.actual) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation finale
    const actualValue = parseFloat(formData.actual)
    if (config?.validation) {
      if (actualValue < config.validation.min || actualValue > config.validation.max) {
        if (!confirm(`Valeur en dehors de la plage normale (${config.validation.min}-${config.validation.max}). Continuer ?`)) {
          return
        }
      }
    }

    // Simuler la sauvegarde
    const savedData = {
      indicateur: config?.libelle,
      responsable: config?.responsable,
      periode: formData.period,
      frequence: config?.frequence,
      prevu: parseFloat(formData.planned),
      realise: actualValue,
      performance: calculationResult.performance.toFixed(1),
      methode: formData.method,
      commentaires: formData.comments,
      date_saisie: new Date().toLocaleString('fr-FR')
    }

    console.log('Données sauvegardées:', savedData)
    alert(`Données enregistrées avec succès!\n\nIndicateur: ${config?.libelle}\nPériode: ${formData.period}\nPerformance: ${calculationResult.performance.toFixed(1)}%`)
    
    // Reset du formulaire
    handleIndicatorChange('')
  }

  const handleValidate = () => {
    if (confirm('Confirmer la validation de ces données? Elles ne pourront plus être modifiées.')) {
      alert('Données validées avec succès!')
    }
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
          <Keyboard className="w-8 h-8 text-niger-orange" />
          <span>Saisie des Données - Mars 2025</span>
        </h1>
        <p className="mt-2 text-muted-500 text-lg">
          Interface de saisie intelligente avec validation automatique des données
        </p>
      </div>

      {/* Formulaire principal */}
      <Card>
        <CardHeader>
          <CardTitle>Formulaire de Saisie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sélection indicateur et période */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-700">
                Indicateur *
              </label>
              <Select value={selectedIndicator} onChange={(e) => handleIndicatorChange(e.target.value)}>
                <option value="">Sélectionner un indicateur</option>
                {Object.entries(indicatorConfigs).map(([key, config]) => (
                  <option key={key} value={key}>{config.libelle}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-700">
                Période *
              </label>
              <Select value={formData.period} onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}>
                <option value="2025-03">Mars 2025</option>
                <option value="2025-02">Février 2025</option>
                <option value="2025-Q1">T1 2025</option>
                <option value="2025">Année 2025</option>
              </Select>
            </div>
          </div>

          {/* Informations sur l'indicateur */}
          {config && <IndicatorInfoPanel config={config} show={true} />}

          {/* Valeurs principales */}
          {config && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-700">
                  Valeur Prévue *
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 45"
                  value={formData.planned}
                  onChange={(e) => setFormData(prev => ({ ...prev, planned: e.target.value }))}
                />
                <div className="text-xs text-muted-500">
                  {config.hints.planned}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-700">
                  Valeur Réalisée *
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 39"
                  value={formData.actual}
                  onChange={(e) => setFormData(prev => ({ ...prev, actual: e.target.value }))}
                />
                <div className="text-xs text-muted-500">
                  {config.hints.actual}
                </div>
              </div>
            </div>
          )}

          {/* Champs supplémentaires */}
          {config && (
            <AdditionalFields
              fields={config.fields}
              values={formData.additionalFields}
              onChange={handleAdditionalFieldChange}
              show={true}
            />
          )}

          {/* Méthode et commentaires */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-700">
                Méthode de Collecte Utilisée
              </label>
              <textarea
                className="w-full p-3 border border-muted-200 rounded-md focus:ring-2 focus:ring-niger-orange focus:border-niger-orange"
                rows={2}
                placeholder="Décrire la méthode utilisée pour collecter les données..."
                value={formData.method}
                onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-700">
                Commentaires/Observations
              </label>
              <textarea
                className="w-full p-3 border border-muted-200 rounded-md focus:ring-2 focus:ring-niger-orange focus:border-niger-orange"
                rows={4}
                placeholder="Expliquer les écarts, difficultés rencontrées, actions menées..."
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              />
            </div>
          </div>

          {/* Alertes de validation */}
          <ValidationAlerts alerts={validationAlerts} />

          {/* Résultat du calcul */}
          <CalculationResult 
            performance={calculationResult.performance}
            gap={calculationResult.gap}
            unite={config?.unite || ''}
            show={calculationResult.show}
          />

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-muted-200">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
            <Button onClick={handleValidate}>
              <Check className="w-4 h-4 mr-2" />
              Valider
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
