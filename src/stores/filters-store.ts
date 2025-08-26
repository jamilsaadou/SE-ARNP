import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface FiltersState {
  // Filtres pour les indicateurs
  indicatorFilters: {
    responsable: string
    frequence: string
    statut: string
    search: string
    periode: string
  }

  // Filtres pour les rapports
  reportFilters: {
    type: string
    statut: string
    responsable: string
    search: string
  }

  // Filtres pour le calendrier
  calendarFilters: {
    type: string
    responsable: string
    statut: string
  }

  // Actions
  setIndicatorFilters: (filters: Partial<FiltersState['indicatorFilters']>) => void
  clearIndicatorFilters: () => void

  setReportFilters: (filters: Partial<FiltersState['reportFilters']>) => void
  clearReportFilters: () => void

  setCalendarFilters: (filters: Partial<FiltersState['calendarFilters']>) => void
  clearCalendarFilters: () => void

  clearAllFilters: () => void
}

const initialIndicatorFilters = {
  responsable: '',
  frequence: '',
  statut: '',
  search: '',
  periode: ''
}

const initialReportFilters = {
  type: '',
  statut: '',
  responsable: '',
  search: ''
}

const initialCalendarFilters = {
  type: '',
  responsable: '',
  statut: ''
}

export const useFiltersStore = create<FiltersState>()(
  devtools(
    immer((set) => ({
      indicatorFilters: initialIndicatorFilters,
      reportFilters: initialReportFilters,
      calendarFilters: initialCalendarFilters,

      setIndicatorFilters: (filters) => set((state) => {
        Object.assign(state.indicatorFilters, filters)
      }),

      clearIndicatorFilters: () => set((state) => {
        state.indicatorFilters = { ...initialIndicatorFilters }
      }),

      setReportFilters: (filters) => set((state) => {
        Object.assign(state.reportFilters, filters)
      }),

      clearReportFilters: () => set((state) => {
        state.reportFilters = { ...initialReportFilters }
      }),

      setCalendarFilters: (filters) => set((state) => {
        Object.assign(state.calendarFilters, filters)
      }),

      clearCalendarFilters: () => set((state) => {
        state.calendarFilters = { ...initialCalendarFilters }
      }),

      clearAllFilters: () => set((state) => {
        state.indicatorFilters = { ...initialIndicatorFilters }
        state.reportFilters = { ...initialReportFilters }
        state.calendarFilters = { ...initialCalendarFilters }
      })
    })),
    { name: 'filters-store' }
  )
)
