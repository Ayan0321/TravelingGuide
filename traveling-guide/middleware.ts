import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const isAdmin = req.cookies.get('tg_admin')?.value === '1'
	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!isAdmin && !req.nextUrl.pathname.startsWith('/admin/login')) {
			const url = req.nextUrl.clone()
			url.pathname = '/admin/login'
			url.searchParams.set('next', req.nextUrl.pathname)
			return NextResponse.redirect(url)
		}
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*']
}