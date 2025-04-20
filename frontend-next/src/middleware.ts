import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Supported languages
export const supportedLocales = ['he-IL', 'en-US']
export const defaultLocale = 'he-IL'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language') || defaultLocale
  
  // Create headers object expected by Negotiator
  const headersObj: Record<string, string> = { 'accept-language': acceptLanguage }
  
  // Using type assertion for compatibility with negotiator
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const negotiator = new Negotiator({ headers: headersObj as any })
  
  // Get languages from negotiator
  const locales = negotiator.languages()
  
  // Use negotiator to get locale from headers
  try {
    return match(locales, supportedLocales, defaultLocale)
  } catch {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  // Check if there is a cookie with the locale
  const locale = request.cookies.get('NEXT_LOCALE')?.value || getLocale(request)
  
  // Create a response
  const response = NextResponse.next()
  
  // Set the locale cookie
  response.cookies.set('NEXT_LOCALE', locale)
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|locales|.*\\..*).*)'],
} 