import { NextRequest, NextResponse } from 'next/server'
import { getDb, upsertPoster, upsertSetting, getSetting } from '@/lib/db'
import { z } from 'zod'

const PosterSchema = z.object({
	id: z.string().optional(),
	imageUrl: z.string().url(),
	title: z.string().optional(),
	order: z.number().int().min(0),
	active: z.boolean().default(true),
})

export async function GET() {
	const db = await getDb()
	const posters = db.data!.posters.sort((a,b) => a.order - b.order)
	const rotationMs = await getSetting('posterRotationMs', '4000')
	return NextResponse.json({ items: posters, rotationMs: Number(rotationMs) })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = PosterSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const poster = await upsertPoster(parsed.data)
	return NextResponse.json(poster, { status: 201 })
}

export async function PUT(req: NextRequest) {
	const body = await req.json()
	const rotationMs = Number(body?.rotationMs)
	if (!Number.isFinite(rotationMs) || rotationMs < 1000) return NextResponse.json({ error: 'Invalid rotationMs' }, { status: 400 })
	await upsertSetting('posterRotationMs', String(rotationMs))
	return NextResponse.json({ ok: true })
}