import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Indicateur, IndicateurConfig } from '../types'
import { indicatorsData } from '../data/indicators-data'
import { indicatorConfigs } from '../data/indicators-config'

interface IndicatorsState {
  // État
  indicators: Indicateur[]
  configs: Record<string, IndicateurConfig>
  selectedIndicator: string | null
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null

  // Actions de base
  setIndicators: (indicators: Indicateur[]) => void
  addIndicator: (indicator: Indicateur) => void
  updateIndicator: (id: string, updates: Partial<Indicateur>) => void
  deleteIndicator: (id: string) => void
  selectIndicator: (id: string | null) => void

  // Actions avancées
  bulkUpdateIndicators: (updates: Array<{ id: string; data: Partial<Indicateur> }>) => void
  recalculatePerformances: () => void
  getIndicatorsByResponsable: (responsable: string) => Indicateur[]
  getIndicatorsByFrequence: (frequence: string) => Indicateur[]
  getIndicatorsByStatut: (statut: string) => Indicateur[]

  // Actions d'API simulées
  fetchIndicators: () => Promise<void>
  saveIndicator: (indicatorData: Partial<Indicateur>) => Promise<Indicateur>
  validateIndicator: (id: string) => Promise<void>

  // Utilitaires
  getStats: () => {
    total: number
    byResponsable: Record<string, number>
    byStatut: Record<string, number>
    byFrequence: Record<string, number>
    averagePerformance: number
  }
}

export const useIndicatorsStore = create<IndicatorsState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // État initial
        indicators: indicatorsData,
        configs: indicatorConfigs,
        selectedIndicator: null,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),

        // Actions de base
        setIndicators: (indicators) => set((state) => {
          state.indicators = indicators
          state.lastUpdated = new Date()
        }),

        addIndicator: (indicator) => set((state) => {
          state.indicators.push(indicator)
          state.lastUpdated = new Date()
        }),

        updateIndicator: (id, updates) => set((state) => {
          const index = state.indicators.findIndex(ind => ind.id === id)
          if (index !== -1) {
            Object.assign(state.indicators[index], updates)
            state.indicators[index].updatedAt = new Date()
            state.lastUpdated = new Date()
          }
        }),

        deleteIndicator: (id) => set((state) => {
          state.indicators = state.indicators.filter(ind => ind.id !== id)
          if (state.selectedIndicator === id) {
            state.selectedIndicator = null
          }
          state.lastUpdated = new Date()
        }),

        selectIndicator: (id) => set((state) => {
          state.selectedIndicator = id
        }),

        // Actions avancées
        bulkUpdateIndicators: (updates) => set((state) => {
          updates.forEach(({ id, data }) => {
            const index = state.indicators.findIndex(ind => ind.id === id)
            if (index !== -1) {
              Object.assign(state.indicators[index], data)
              state.indicators[index].updatedAt = new Date()
            }
          })
          state.lastUpdated = new Date()
        }),

        recalculatePerformances: () => set((state) => {
          state.indicators.forEach(indicator => {
            if (indicator.prevu > 0) {
              indicator.performance = (indicator.realise / indicator.prevu) * 100
              
              // Recalculer le statut
              if (indicator.performance >= 90) {
                indicator.statut = 'excellent'
              } else if (indicator.performance >= 70) {
                indicator.statut = 'satisfaisant'
              } else {
                indicator.statut = 'critique'
              }
            }
          })
          state.lastUpdated = new Date()
        }),

        getIndicatorsByResponsable: (responsable) => {
          return get().indicators.filter(ind => ind.responsable === responsable)
        },

        getIndicatorsByFrequence: (frequence) => {
          return get().indicators.filter(ind => ind.frequence === frequence)
        },

        getIndicatorsByStatut: (statut) => {
          return get().indicators.filter(ind => ind.statut === statut)
        },

        // Actions d'API simulées
        fetchIndicators: async () => {
          set((state) => { state.isLoading = true; state.error = null })
          
          try {
            // Simulation d'appel API
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            set((state) => {
              state.indicators = indicatorsData
              state.isLoading = false
              state.lastUpdated = new Date()
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = 'Erreur lors du chargement des indicateurs'
            })
          }
        },

        saveIndicator: async (indicatorData) => {
          set((state) => { state.isLoading = true; state.error = null })
          
          try {
            // Simulation d'appel API
            await new Promise(resolve => setTimeout(resolve, 800))
            
            const newIndicator: Indicateur = {
              id: `ind_${Date.now()}`,
              libelle: indicatorData.libelle || '',
              responsable: indicatorData.responsable || '',
              frequence: indicatorData.frequence || 'mensuelle',
              unite: indicatorData.unite || '',
              type: indicatorData.type || '',
              formule: indicatorData.formule || '',
              methode: indicatorData.methode || '',
              prevu: indicatorData.prevu || 0,
              realise: indicatorData.realise || 0,
              performance: indicatorData.performance || 0,
              statut: indicatorData.statut || 'critique',
              periode: indicatorData.periode || '',
              commentaires: indicatorData.commentaires,
              createdAt: new Date(),
              updatedAt: new Date(),
            }

            set((state) => {
              if (indicatorData.id) {
                // Mise à jour
                const index = state.indicators.findIndex(ind => ind.id === indicatorData.id)
                if (index !== -1) {
                  state.indicators[index] = { ...state.indicators[index], ...indicatorData, updatedAt: new Date() }
                }
              } else {
                // Création
                state.indicators.push(newIndicator)
              }
              state.isLoading = false
              state.lastUpdated = new Date()
            })

            return newIndicator
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = 'Erreur lors de la sauvegarde'
            })
            throw error
          }
        },

        validateIndicator: async (id) => {
          set((state) => { state.isLoading = true })
          
          try {
            await new Promise(resolve => setTimeout(resolve, 500))
            
            set((state) => {
              const index = state.indicators.findIndex(ind => ind.id === id)
              if (index !== -1) {
                // Marquer comme validé (on pourrait ajouter un champ 'validated' au type)
                state.indicators[index].updatedAt = new Date()
              }
              state.isLoading = false
              state.lastUpdated = new Date()
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = 'Erreur lors de la validation'
            })
          }
        },

        // Utilitaires
        getStats: () => {
          const indicators = get().indicators
          const stats = {
            total: indicators.length,
            byResponsable: {} as Record<string, number>,
            byStatut: {} as Record<string, number>,
            byFrequence: {} as Record<string, number>,
            averagePerformance: 0
          }

          // Calculer les statistiques
          indicators.forEach(ind => {
            // Par responsable
            stats.byResponsable[ind.responsable] = (stats.byResponsable[ind.responsable] || 0) + 1
            
            // Par statut
            stats.byStatut[ind.statut] = (stats.byStatut[ind.statut] || 0) + 1
            
            // Par fréquence
            stats.byFrequence[ind.frequence] = (stats.byFrequence[ind.frequence] || 0) + 1
          })

          // Performance moyenne
          const totalPerformance = indicators.reduce((sum, ind) => sum + ind.performance, 0)
          stats.averagePerformance = indicators.length > 0 ? totalPerformance / indicators.length : 0

          return stats
        }
      })),
      {
        name: 'anrp-indicators-store',
        partialize: (state) => ({
          indicators: state.indicators,
          lastUpdated: state.lastUpdated
        })
      }
    ),
    { name: 'indicators-store' }
  )
)
