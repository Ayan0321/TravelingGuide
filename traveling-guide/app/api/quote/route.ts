import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const QuoteSchema = z.object({
	name: z.string().min(2),
	email: z.string().email().optional(),
	phone: z.string().min(7),
	dates: z.string().optional(),
	states: z.string().optional(),
	service: z.string().optional(),
	message: z.string().optional(),
})

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = QuoteSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	console.log('QUOTE REQUEST', parsed.data)
	return NextResponse.json({ ok: true })
}