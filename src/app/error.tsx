'use client'

import { useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log l'erreur pour le monitoring
    console.error('Application error:', error)
    
    // En production, on enverrait l'erreur à un service de monitoring
    if (process.env.NODE_ENV === 'production') {
      // trackError(error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-muted-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          {/* Icône d'erreur */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
            <h1 className="text-2xl font-bold text-muted-900">
              Une erreur s&apos;est produite
            </h1>
          </div>

          {/* Message d'erreur */}
          <div className="mb-8">
            <Alert variant="danger">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Erreur inattendue</p>
                  <p className="text-sm">
                    {error.message || 'Une erreur technique s\'est produite. Veuillez réessayer.'}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-muted-500 font-mono">
                      ID: {error.digest}
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            
            <Link href="/dashboard">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>

          {/* Aide */}
          <div className="mt-8 pt-6 border-t border-muted-200 text-sm text-muted-600">
            <p>
              Si le problème persiste, contactez l&apos;équipe technique avec l&apos;ID d&apos;erreur.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
