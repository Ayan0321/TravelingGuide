import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ContactSchema = z.object({
	name: z.string().min(2),
	email: z.string().email().optional(),
	phone: z.string().min(7),
	message: z.string().min(5),
})

export async function POST(req: NextRequest) {
	const body = await req.json()
	const parsed = ContactSchema.safeParse(body)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })
	console.log('CONTACT MESSAGE', parsed.data)
	return NextResponse.json({ ok: true })
}