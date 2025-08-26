'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Keyboard, 
  FileText, 
  Calendar,
  ChevronRight 
} from 'lucide-react'

const navigationItems = [
  {
    href: '/dashboard',
    label: 'Tableau de Bord',
    icon: LayoutDashboard,
    count: null,
  },
  {
    href: '/indicateurs',
    label: 'Indicateurs',
    icon: TrendingUp,
    count: 25,
  },
  {
    href: '/responsables',
    label: 'Par Responsable',
    icon: Users,
    count: null,
  },
  {
    href: '/saisie',
    label: 'Saisie Données',
    icon: Keyboard,
    count: null,
  },
  {
    href: '/rapports',
    label: 'Rapports',
    icon: FileText,
    count: null,
  },
  {
    href: '/calendrier',
    label: 'Calendrier',
    icon: Calendar,
    count: null,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-muted-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-all duration-200
                  ${isActive 
                    ? 'border-niger-orange text-niger-orange bg-niger-50' 
                    : 'border-transparent text-muted-500 hover:text-niger-orange hover:border-muted-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.count && (
                  <span className="ml-2 px-2 py-1 text-xs bg-niger-orange text-white rounded-full">
                    {item.count}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3 h-3 ml-1" />}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
