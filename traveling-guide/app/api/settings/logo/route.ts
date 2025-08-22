import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { upsertSetting } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

const LogoSchema = z.object({ url: z.string().url() })

export async function POST(req: NextRequest) {
	if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const body = await req.json()
	const parsed = LogoSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	await upsertSetting('logoUrl', parsed.data.url)
	return NextResponse.json({ ok: true })
}