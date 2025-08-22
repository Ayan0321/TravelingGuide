import { NextRequest, NextResponse } from 'next/server'
import { deletePoster } from '@/lib/db'

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params
	await deletePoster(id)
	return NextResponse.json({ ok: true })
}