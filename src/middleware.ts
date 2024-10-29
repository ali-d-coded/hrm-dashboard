import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/sessions'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/login', '/']

const isProtectedRoute = (path: string): boolean => {
	return protectedRoutes.some(route => path.startsWith(route))
}

export async function middleware(request: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = request.nextUrl.pathname
	console.log({ path })

	const isPublicRoute = publicRoutes.includes(path)

	// 3. Decrypt the session from the cookie
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('session')
	const session = sessionCookie ? await decrypt(sessionCookie.value) : null

	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute(path) && !session?.userId) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	// 5. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		session?.userId &&
		!request.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	// 6. Continue to the next middleware or to the final destination
	return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}