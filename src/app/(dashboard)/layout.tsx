import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { AppProviders } from '@/components/providers/app-providers'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProviders>
      <div className="min-h-screen bg-muted-50">
        <Header />
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </AppProviders>
  )
}
