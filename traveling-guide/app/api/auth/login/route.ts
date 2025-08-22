import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ADMIN_COOKIE, getAdminPassword } from '@/lib/auth'

const LoginSchema = z.object({ password: z.string().min(3) })

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = LoginSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	if (parsed.data.password !== getAdminPassword()) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
	const res = NextResponse.json({ ok: true })
	res.cookies.set(ADMIN_COOKIE, '1', { httpOnly: true, sameSite: 'lax', secure: false, path: '/' })
	return res
}