import { Card, CardContent } from '../components/ui/card'

export default function Loading() {
  return (
    <div className="min-h-screen bg-muted-50 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardContent className="p-8 text-center">
          {/* Logo spinner */}
          <div className="mb-6">
            <div className="w-12 h-12 bg-niger-orange rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            {/* Spinner */}
            <div className="w-8 h-8 border-4 border-muted-200 border-t-niger-orange rounded-full animate-spin mx-auto mb-4"></div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="font-semibold text-muted-900">
              Chargement en cours...
            </h2>
            <p className="text-sm text-muted-600">
              Préparation de votre tableau de bord
            </p>
          </div>

          {/* Barres de progression simulées */}
          <div className="mt-6 space-y-2">
            <div className="h-1 bg-muted-200 rounded-full overflow-hidden">
              <div className="h-full bg-niger-orange rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <div className="h-1 bg-muted-200 rounded-full overflow-hidden">
              <div className="h-full bg-niger-orange rounded-full animate-pulse" style={{ width: '40%', animationDelay: '0.2s' }}></div>
            </div>
            <div className="h-1 bg-muted-200 rounded-full overflow-hidden">
              <div className="h-full bg-niger-orange rounded-full animate-pulse" style={{ width: '80%', animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
