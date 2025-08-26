import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface KPIData {
  id: string
  title: string
  value: number
  target: number
  performance: number
  trend: 'up' | 'down' | 'stable'
  icon: string
  color: string
  responsable: string
  lastUpdated: Date
}

export interface ChartDataPoint {
  date: string
  [key: string]: string | number
}

interface DashboardState {
  // KPIs
  kpis: KPIData[]
  
  // Données des graphiques
  performanceChartData: ChartDataPoint[]
  frequencyChartData: { name: string; value: number; color: string }[]
  
  // Statistiques globales
  globalStats: {
    totalIndicateurs: number
    indicateursMensuels: number
    tauxRealisation: number
    alertesActives: number
  }

  // État de chargement
  isLoadingKPIs: boolean
  isLoadingCharts: boolean
  lastUpdated: Date | null

  // Actions
  updateKPIs: (kpis: KPIData[]) => void
  updateKPI: (id: string, updates: Partial<KPIData>) => void
  
  setPerformanceChartData: (data: ChartDataPoint[]) => void
  setFrequencyChartData: (data: { name: string; value: number; color: string }[]) => void
  
  updateGlobalStats: (stats: Partial<DashboardState['globalStats']>) => void
  
  refreshDashboard: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    immer((set, get) => ({
      // État initial
      kpis: [
        {
          id: 'kpi_auth_prof',
          title: "Autorisations d'Exercice",
          value: 39,
          target: 45,
          performance: 87,
          trend: 'up',
          icon: 'users',
          color: 'warning',
          responsable: 'DG',
          lastUpdated: new Date()
        },
        {
          id: 'kpi_licences',
          title: 'Licences Établissements',
          value: 14,
          target: 12,
          performance: 117,
          trend: 'up',
          icon: 'building',
          color: 'success',
          responsable: 'DOL',
          lastUpdated: new Date()
        },
        {
          id: 'kpi_certificats',
          title: 'Certificats Fabrication',
          value: 18,
          target: 28,
          performance: 64,
          trend: 'down',
          icon: 'file',
          color: 'danger',
          responsable: 'DOL',
          lastUpdated: new Date()
        },
        {
          id: 'kpi_bonnes_pratiques',
          title: 'Bonnes Pratiques',
          value: 13,
          target: 15,
          performance: 87,
          trend: 'stable',
          icon: 'award',
          color: 'warning',
          responsable: 'DOL',
          lastUpdated: new Date()
        }
      ],

      performanceChartData: [
        { date: 'Oct 2024', DG: 82, DOL: 78, 'DG/SSE': 90 },
        { date: 'Nov 2024', DG: 85, DOL: 80, 'DG/SSE': 91 },
        { date: 'Déc 2024', DG: 83, DOL: 85, 'DG/SSE': 89 },
        { date: 'Jan 2025', DG: 88, DOL: 89, 'DG/SSE': 93 },
        { date: 'Fév 2025', DG: 85, DOL: 92, 'DG/SSE': 94 },
        { date: 'Mar 2025', DG: 87, DOL: 89, 'DG/SSE': 92 }
      ],

      frequencyChartData: [
        { name: 'Mensuelle', value: 19, color: '#0d6efd' },
        { name: 'Trimestrielle', value: 2, color: '#ffc107' },
        { name: 'Annuelle', value: 4, color: '#6c757d' }
      ],

      globalStats: {
        totalIndicateurs: 25,
        indicateursMensuels: 19,
        tauxRealisation: 87,
        alertesActives: 3
      },

      isLoadingKPIs: false,
      isLoadingCharts: false,
      lastUpdated: new Date(),

      // Actions
      updateKPIs: (kpis) => set((state) => {
        state.kpis = kpis
        state.lastUpdated = new Date()
      }),

      updateKPI: (id, updates) => set((state) => {
        const index = state.kpis.findIndex(kpi => kpi.id === id)
        if (index !== -1) {
          Object.assign(state.kpis[index], updates)
          state.kpis[index].lastUpdated = new Date()
          state.lastUpdated = new Date()
        }
      }),

      setPerformanceChartData: (data) => set((state) => {
        state.performanceChartData = data
        state.lastUpdated = new Date()
      }),

      setFrequencyChartData: (data) => set((state) => {
        state.frequencyChartData = data
        state.lastUpdated = new Date()
      }),

      updateGlobalStats: (stats) => set((state) => {
        Object.assign(state.globalStats, stats)
        state.lastUpdated = new Date()
      }),

      refreshDashboard: async () => {
        set((state) => {
          state.isLoadingKPIs = true
          state.isLoadingCharts = true
        })

        try {
          // Simulation des appels API
          await Promise.all([
            new Promise(resolve => setTimeout(resolve, 800)), // KPIs
            new Promise(resolve => setTimeout(resolve, 600))  // Charts
          ])

          // Ici on appellerait les vraies APIs
          // const kpisData = await fetchKPIs()
          // const chartsData = await fetchCharts()

          set((state) => {
            state.isLoadingKPIs = false
            state.isLoadingCharts = false
            state.lastUpdated = new Date()
          })
        } catch (error) {
          set((state) => {
            state.isLoadingKPIs = false
            state.isLoadingCharts = false
          })
        }
      }
    })),
    { name: 'dashboard-store' }
  )
)
