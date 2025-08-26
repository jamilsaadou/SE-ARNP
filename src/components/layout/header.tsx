'use client'

import Image from 'next/image'
import { User, Settings, LogOut, Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-niger-orange to-niger-green text-white shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <Image
              src="/anrmplogo.png"
              alt="ANRP Logo"
              width={150}
              height={150}
              className="object-contain"
            />
            <div>
              <h1 className="text-xl font-semibold">ANRP Niger</h1>
              <p className="text-sm opacity-90">Plateforme Suivi-Évaluation</p>
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button 
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Notifications clicked')}
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-danger text-white text-xs">
                3
              </Badge>
            </button>

            {/* Profil utilisateur */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-medium">Dr. Amadou HASSAN</p>
                <p className="text-sm opacity-80">Directeur Général</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
