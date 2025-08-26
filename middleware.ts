import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log des requêtes en développement
  if (process.env.NODE_ENV === 'development') {
    console.log(`${request.method} ${request.url}`)
  }

  // Headers de sécurité additionnels
  const response = NextResponse.next()
  
  response.headers.set('X-Robots-Tag', 'noindex')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
