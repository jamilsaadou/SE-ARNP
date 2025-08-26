import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface AppState {
  // Navigation et UI
  currentPage: string
  sidebarCollapsed: boolean
  
  // Notifications
  notifications: Notification[]
  unreadCount: number

  // Modals et overlays
  activeModal: string | null
  loading: boolean
  
  // Préférences utilisateur
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: 'fr' | 'en'
    dateFormat: 'dd/MM/yyyy' | 'MM/dd/yyyy'
    autoRefresh: boolean
    refreshInterval: number // en minutes
  }

  // Actions
  setCurrentPage: (page: string) => void
  toggleSidebar: () => void
  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  clearNotifications: () => void
  
  setActiveModal: (modal: string | null) => void
  setLoading: (loading: boolean) => void
  
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    immer((set, get) => ({
      // État initial
      currentPage: 'dashboard',
      sidebarCollapsed: false,
      
      notifications: [
        {
          id: 'notif_001',
          type: 'warning',
          title: 'Échéance proche',
          message: '5 indicateurs mensuels en attente de saisie',
          timestamp: new Date(),
          read: false,
          actionUrl: '/saisie'
        },
        {
          id: 'notif_002',
          type: 'error',
          title: 'Performance critique',
          message: 'Certificats fabrication (DOL) : 64% de réalisation',
          timestamp: new Date(Date.now() - 3600000), // il y a 1h
          read: false,
          actionUrl: '/indicateurs'
        },
        {
          id: 'notif_003',
          type: 'success',
          title: 'Objectif dépassé',
          message: 'Licences établissements : 117% ce mois',
          timestamp: new Date(Date.now() - 7200000), // il y a 2h
          read: true
        }
      ],
      unreadCount: 2,
      
      activeModal: null,
      loading: false,
      
      preferences: {
        theme: 'light',
        language: 'fr',
        dateFormat: 'dd/MM/yyyy',
        autoRefresh: true,
        refreshInterval: 15
      },

      // Actions
      setCurrentPage: (page) => set((state) => {
        state.currentPage = page
      }),

      toggleSidebar: () => set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed
      }),

      addNotification: (notification) => set((state) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif_${Date.now()}`,
          timestamp: new Date(),
          read: false
        }
        
        state.notifications.unshift(newNotification)
        state.unreadCount += 1
        
        // Garder seulement les 50 dernières notifications
        if (state.notifications.length > 50) {
          state.notifications = state.notifications.slice(0, 50)
        }
      }),

      markNotificationRead: (id) => set((state) => {
        const notification = state.notifications.find(n => n.id === id)
        if (notification && !notification.read) {
          notification.read = true
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
      }),

      markAllNotificationsRead: () => set((state) => {
        state.notifications.forEach(n => n.read = true)
        state.unreadCount = 0
      }),

      clearNotifications: () => set((state) => {
        state.notifications = []
        state.unreadCount = 0
      }),

      setActiveModal: (modal) => set((state) => {
        state.activeModal = modal
      }),

      setLoading: (loading) => set((state) => {
        state.loading = loading
      }),

      updatePreferences: (preferences) => set((state) => {
        Object.assign(state.preferences, preferences)
      })
    })),
    { name: 'app-store' }
  )
)
