import { NextRequest, NextResponse } from 'next/server'
import { getDb, createState } from '@/lib/db'
import { z } from 'zod'

const StateCreateSchema = z.object({
	name: z.string().min(2),
	description: z.string().default(''),
	coverImageUrl: z.string().url(),
	aliases: z.array(z.string()).default([]),
	featuredPlaceName: z.string().optional(),
})

export async function GET() {
	const db = await getDb()
	return NextResponse.json({ items: db.data!.states })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = StateCreateSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	const state = await createState(parsed.data)
	state.aliases = parsed.data.aliases
	if (parsed.data.featuredPlaceName) state.featuredPlaceName = parsed.data.featuredPlaceName
	const db = await getDb()
	await db.write()
	return NextResponse.json(state, { status: 201 })
}