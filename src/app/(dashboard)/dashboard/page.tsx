import { LayoutDashboard } from 'lucide-react'
import { StatsOverview } from '@/components/sections/dashboard/stats-overview'
import { KPISection } from '@/components/sections/dashboard/kpi-cards' 
import { PerformanceChart } from '@/components/charts/performance-chart'
import { FrequencyChart } from '@/components/charts/frequency-chart'
import { AlertsSection } from '@/components/sections/dashboard/alerts-section'

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-muted-900 flex items-center space-x-3">
          <LayoutDashboard className="w-8 h-8 text-niger-orange" />
          <span>Tableau de Bord - Mars 2025</span>
        </h1>
        <p className="mt-2 text-muted-500 text-lg">
          Vue d'ensemble des performances et indicateurs clés de l'ANRP
        </p>
      </div>
      
      {/* Statistiques générales */}
      <StatsOverview />
      
      {/* KPIs principaux */}
      <KPISection />
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceChart />
        <FrequencyChart />
      </div>
      
      {/* Alertes */}
      <AlertsSection />
    </div>
  )
}
