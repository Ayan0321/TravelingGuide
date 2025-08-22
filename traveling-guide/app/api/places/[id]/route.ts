import { NextRequest, NextResponse } from 'next/server'
import { getDb, updatePlace, deletePlace } from '@/lib/db'
import { z } from 'zod'

const PlaceUpdateSchema = z.object({
	name: z.string().min(2).optional(),
	description: z.string().optional(),
	imageUrls: z.array(z.string().url()).optional(),
	aliases: z.array(z.string()).optional(),
	city: z.string().optional(),
	theme: z.string().optional(),
	budget: z.enum(['budget','mid','luxury']).optional(),
})

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	const db = await getDb()
	const item = db.data!.places.find(s => s.id === id)
	if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	return NextResponse.json(item)
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	const body = await req.json()
	const parsed = PlaceUpdateSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const updated = await updatePlace(id, parsed.data)
	if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	await deletePlace(id)
	return NextResponse.json({ ok: true })
}