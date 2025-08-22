import { NextRequest, NextResponse } from 'next/server'
import { getDb, upsertService } from '@/lib/db'
import { z } from 'zod'

const ServiceSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2),
	icon: z.string().min(1),
	description: z.string().default(''),
	active: z.boolean().default(true),
})

export async function GET() {
	const db = await getDb()
	return NextResponse.json({ items: db.data!.services })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = ServiceSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const item = await upsertService(parsed.data)
	return NextResponse.json(item, { status: 201 })
}