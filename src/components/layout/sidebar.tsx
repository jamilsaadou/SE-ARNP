'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  PenTool,
  Users,
} from 'lucide-react'

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  { name: 'Indicateurs', href: '/indicateurs', icon: BarChart3 },
  { name: 'Responsables', href: '/responsables', icon: Users },
  { name: 'Saisie', href: '/saisie', icon: PenTool },
  { name: 'Rapports', href: '/rapports', icon: FileText },
  { name: 'Calendrier', href: '/calendrier', icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow-sm">
      <div className="flex items-center justify-center h-16 px-8 border-b">
        <div className="flex items-center space-x-3">
          <Image
            src="/anrmplogo.png"
            alt="ANRP Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">ANRP Platform</h1>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
