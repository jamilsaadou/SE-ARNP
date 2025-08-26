'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Plus, 
  Settings, 
  FileText, 
  Calendar,
  Users,
  BarChart3,
  Info
} from 'lucide-react'

interface ReportGeneratorProps {
  onGenerate: (config: ReportConfig) => void
}

interface ReportConfig {
  type: string
  periode: string
  responsable?: string
  format: string
  includeCharts: boolean
  includeDetails: boolean
}

const reportTypes = [
  {
    id: 'mensuel',
    label: 'Rapport Mensuel',
    description: 'Synthèse mensuelle de tous les indicateurs',
    icon: Calendar
  },
  {
    id: 'trimestriel', 
    label: 'Rapport Trimestriel',
    description: 'Analyse trimestrielle avec tendances',
    icon: BarChart3
  },
  {
    id: 'responsable',
    label: 'Rapport par Responsable', 
    description: 'Performance spécifique d\'une direction',
    icon: Users
  },
  {
    id: 'executif',
    label: 'Tableau de Bord Exécutif',
    description: 'Vue synthétique pour la direction',
    icon: FileText
  }
]

export function ReportGenerator({ onGenerate }: ReportGeneratorProps) {
  const [config, setConfig] = useState<ReportConfig>({
    type: '',
    periode: '2025-03',
    responsable: '',
    format: 'pdf',
    includeCharts: true,
    includeDetails: true
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!config.type) {
      alert('Veuillez sélectionner un type de rapport')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulation de génération
      await new Promise(resolve => setTimeout(resolve, 2000))
      onGenerate(config)
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedType = reportTypes.find(t => t.id === config.type)

  return (
    <Card className="border-l-4 border-l-success">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5 text-success" />
          <span>Générateur de Rapports</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sélection du type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-muted-700">
              Type de Rapport *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      config.type === type.id 
                        ? 'border-niger-orange bg-niger-50' 
                        : 'border-muted-200 hover:border-muted-300'
                    }`}
                    onClick={() => setConfig(prev => ({ ...prev, type: type.id }))}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        config.type === type.id ? 'text-niger-orange' : 'text-muted-500'
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-500 mt-1">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Configuration */}
          {selectedType && (
            <div className="space-y-4 p-4 bg-muted-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Settings className="w-4 h-4 text-muted-600" />
                <span className="text-sm font-medium text-muted-700">Configuration</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-700">
                    Période *
                  </label>
                  <Select 
                    value={config.periode}
                    onChange={(e) => setConfig(prev => ({ ...prev, periode: e.target.value }))}
                  >
                    <option value="2025-03">Mars 2025</option>
                    <option value="2025-02">Février 2025</option>
                    <option value="2025-Q1">T1 2025</option>
                    <option value="2025">Année 2025</option>
                  </Select>
                </div>

                {config.type === 'responsable' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-muted-700">
                      Responsable *
                    </label>
                    <Select
                      value={config.responsable}
                      onChange={(e) => setConfig(prev => ({ ...prev, responsable: e.target.value }))}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="DG">Direction Générale</option>
                      <option value="DOL">Direction Ouvertures et Licences</option>
                      <option value="DISAC">Direction Inspection et Surveillance</option>
                      <option value="DH">Direction Homologation</option>
                      <option value="DVUE">Direction Vigilance et Usages</option>
                      <option value="DG/SSE">Service Suivi-Évaluation</option>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-700">
                    Format
                  </label>
                  <Select
                    value={config.format}
                    onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value }))}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="word">Word</option>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-muted-700">
                    Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.includeCharts}
                        onChange={(e) => setConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                        className="rounded border-muted-300 text-niger-orange focus:ring-niger-orange"
                      />
                      <span className="text-sm">Inclure graphiques</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.includeDetails}
                        onChange={(e) => setConfig(prev => ({ ...prev, includeDetails: e.target.checked }))}
                        className="rounded border-muted-300 text-niger-orange focus:ring-niger-orange"
                      />
                      <span className="text-sm">Inclure détails</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Informations du rapport */}
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="text-sm">
                    <strong>Contenu prévu:</strong>
                    <ul className="mt-1 list-disc list-inside text-xs space-y-0.5">
                      {config.type === 'mensuel' && (
                        <>
                          <li>Performance globale des 25 indicateurs</li>
                          <li>Alertes et recommandations</li>
                          <li>Évolution par rapport au mois précédent</li>
                        </>
                      )}
                      {config.type === 'responsable' && config.responsable && (
                        <>
                          <li>Performance spécifique {config.responsable}</li>
                          <li>Détail des indicateurs sous responsabilité</li>
                          <li>Plan d'action recommandé</li>
                        </>
                      )}
                      {config.type === 'executif' && (
                        <>
                          <li>5 KPIs prioritaires</li>
                          <li>Vue synthétique pour la direction</li>
                          <li>Alertes critiques</li>
                        </>
                      )}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-muted-200">
            <Button
              variant="outline"
              onClick={() => setConfig({
                type: '',
                periode: '2025-03',
                responsable: '',
                format: 'pdf',
                includeCharts: true,
                includeDetails: true
              })}
            >
              Réinitialiser
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!config.type || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Settings className="w-4 h-4 mr-2 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Générer Rapport
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
