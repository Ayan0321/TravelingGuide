import { NextRequest, NextResponse } from 'next/server'
import { getDb, updateState, deleteState } from '@/lib/db'
import { z } from 'zod'

const StateUpdateSchema = z.object({
	name: z.string().min(2).optional(),
	description: z.string().optional(),
	coverImageUrl: z.string().url().optional(),
	aliases: z.array(z.string()).optional(),
	featuredPlaceName: z.string().optional(),
})

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	const db = await getDb()
	const item = db.data!.states.find(s => s.id === id)
	if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	return NextResponse.json(item)
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	const body = await req.json()
	const parsed = StateUpdateSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const updated = await updateState(id, parsed.data)
	if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	await deleteState(id)
	return NextResponse.json({ ok: true })
}