'use client'

import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardContent className="p-8">
          {/* Illustration 404 */}
          <div className="mb-6">
            <div className="text-6xl font-bold text-niger-orange mb-2">404</div>
            <div className="w-16 h-1 bg-niger-orange mx-auto rounded-full"></div>
          </div>

          {/* Message */}
          <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-bold text-muted-900">
              Page non trouvée
            </h1>
            <p className="text-muted-600">
              La page que vous recherchez n&apos;existe pas ou a été déplacée. 
              Vérifiez l&apos;URL ou retournez à l&apos;accueil.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard">
              <Button>
                <Home className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>
            
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Page précédente
            </Button>
          </div>

          {/* Liens utiles */}
          <div className="mt-8 pt-6 border-t border-muted-200">
            <h3 className="text-sm font-medium text-muted-700 mb-3">
              Liens rapides
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/dashboard" className="text-niger-orange hover:text-niger-600">
                Tableau de bord
              </Link>
              <Link href="/indicateurs" className="text-niger-orange hover:text-niger-600">
                Indicateurs
              </Link>
              <Link href="/saisie" className="text-niger-orange hover:text-niger-600">
                Saisie données
              </Link>
              <Link href="/rapports" className="text-niger-orange hover:text-niger-600">
                Rapports
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
