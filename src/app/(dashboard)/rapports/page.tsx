'use client'

import { useState } from 'react'
import { FileText, Filter, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ReportCard } from '@/components/sections/reports/report-card'
import { ReportGenerator } from '@/components/sections/reports/report-generator'
import { reportsData } from '@/data/reports-data'

export default function RapportsPage() {
  const [showGenerator, setShowGenerator] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleDownload = (id: string) => {
    console.log('Téléchargement rapport:', id)
    // Simulation de téléchargement
    const report = reportsData.find(r => r.id === id)
    if (report) {
      alert(`Téléchargement de "${report.titre}" en cours...`)
      // Ici on déclencherait le téléchargement réel
    }
  }

  const handleView = (id: string) => {
    console.log('Visualisation rapport:', id)
    // Ici on ouvrirait le rapport dans un viewer ou nouvelle page
    alert('Ouverture du visualiseur de rapports...')
  }

  const handleGenerate = (id: string) => {
    console.log('Génération rapport:', id)
    alert('Génération du rapport en cours...')
  }

  const handleGenerateNew = (config: any) => {
    console.log('Nouveau rapport généré:', config)
    alert(`Rapport "${config.type}" généré avec succès pour ${config.periode}`)
    setShowGenerator(false)
  }

  // Filtrer les rapports
  const filteredReports = reportsData.filter(rapport => {
    // Filtre par statut
    if (filterStatus !== 'all' && rapport.statut !== filterStatus) {
      return false
    }
    
    // Filtre par type
    if (filterType !== 'all' && rapport.type !== filterType) {
      return false
    }
    
    // Recherche textuelle
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesTitle = rapport.titre.toLowerCase().includes(searchLower)
      const matchesResponsable = rapport.responsable.toLowerCase().includes(searchLower)
      const matchesDestinataire = rapport.destinataire.toLowerCase().includes(searchLower)
      
      if (!matchesTitle && !matchesResponsable && !matchesDestinataire) {
        return false
      }
    }
    
    return true
  })

  return (
    <div className="animate-fade-in space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
            <FileText className="w-8 h-8 text-niger-orange" />
            <span>Rapports Disponibles</span>
          </h1>
          <p className="mt-2 text-muted-500 text-lg">
            Génération et consultation des rapports de suivi-évaluation
          </p>
        </div>
        
        <Button onClick={() => setShowGenerator(!showGenerator)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Rapport
        </Button>
      </div>

      {/* Générateur de rapports */}
      {showGenerator && (
        <ReportGenerator onGenerate={handleGenerateNew} />
      )}

      {/* Filtres */}
      <div className="bg-white p-4 rounded-card shadow-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-500" />
            <span className="text-sm font-medium text-muted-600">Filtres:</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-500">Recherche:</span>
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-500">Statut:</span>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Tous</option>
              <option value="complete">Complétés</option>
              <option value="en_cours">En cours</option>
              <option value="planifie">Planifiés</option>
              <option value="retard">En retard</option>
            </Select>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-500">Type:</span>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Tous</option>
              <option value="mensuel">Mensuel</option>
              <option value="trimestriel">Trimestriel</option>
              <option value="annuel">Annuel</option>
              <option value="responsable">Par responsable</option>
            </Select>
          </div>

          <div className="text-sm text-muted-500 ml-auto">
            {filteredReports.length} rapport{filteredReports.length > 1 ? 's' : ''} trouvé{filteredReports.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Liste des rapports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((rapport) => (
          <ReportCard
            key={rapport.id}
            rapport={rapport}
            onDownload={handleDownload}
            onView={handleView}
            onGenerate={handleGenerate}
          />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-600 mb-2">
            Aucun rapport trouvé
          </h3>
          <p className="text-muted-500 mb-4">
            Modifiez vos critères de recherche ou créez un nouveau rapport
          </p>
          <Button variant="outline" onClick={() => setShowGenerator(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Créer un rapport
          </Button>
        </div>
      )}
    </div>
  )
}
