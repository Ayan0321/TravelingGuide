import { NextRequest, NextResponse } from 'next/server'
import { getDb, createPlace } from '@/lib/db'
import { z } from 'zod'

const PlaceCreateSchema = z.object({
	stateId: z.string().min(1),
	name: z.string().min(2),
	description: z.string().default(''),
	imageUrls: z.array(z.string().url()).default([]),
	aliases: z.array(z.string()).default([]),
	city: z.string().optional(),
	theme: z.string().optional(),
	budget: z.enum(['budget','mid','luxury']).optional(),
})

export async function GET() {
	const db = await getDb()
	return NextResponse.json({ items: db.data!.places })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = PlaceCreateSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const place = await createPlace(parsed.data)
	place.aliases = parsed.data.aliases
	place.imageUrls = parsed.data.imageUrls
	const db = await getDb()
	await db.write()
	return NextResponse.json(place, { status: 201 })
}