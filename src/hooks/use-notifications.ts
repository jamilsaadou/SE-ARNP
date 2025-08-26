'use client'

import { useAppStore } from '../stores/app-store'
import { useCallback } from 'react'

export function useNotifications() {
  const {
    notifications,
    unreadCount,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications
  } = useAppStore()

  const notify = useCallback((
    type: 'success' | 'warning' | 'error' | 'info',
    title: string,
    message: string,
    actionUrl?: string
  ) => {
    addNotification({ type, title, message, actionUrl })
  }, [addNotification])

  const notifySuccess = useCallback((title: string, message: string, actionUrl?: string) => {
    notify('success', title, message, actionUrl)
  }, [notify])

  const notifyWarning = useCallback((title: string, message: string, actionUrl?: string) => {
    notify('warning', title, message, actionUrl)
  }, [notify])

  const notifyError = useCallback((title: string, message: string, actionUrl?: string) => {
    notify('error', title, message, actionUrl)
  }, [notify])

  const notifyInfo = useCallback((title: string, message: string, actionUrl?: string) => {
    notify('info', title, message, actionUrl)
  }, [notify])

  return {
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    
    // Helpers pour créer des notifications
    notifySuccess,
    notifyWarning,
    notifyError,
    notifyInfo
  }
}
