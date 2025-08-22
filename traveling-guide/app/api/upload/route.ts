import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { isAdmin } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
	if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const form = await req.formData()
	const file = form.get('file') as File | null
	if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
	const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
	if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
	const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
	const id = randomUUID()
	const target = path.join(uploadsDir, `${id}.${ext}`)
	const arrayBuffer = await file.arrayBuffer()
	let buffer: Buffer = Buffer.from(arrayBuffer as ArrayBuffer)
	try {
		const sharpMod = await import('sharp')
		const sharp = sharpMod.default
		buffer = await sharp(buffer).rotate().resize(1600, 1600, { fit: 'inside' }).jpeg({ quality: 80 }).toBuffer()
		fs.writeFileSync(target, buffer)
	} catch {
		fs.writeFileSync(target, buffer)
	}
	const url = `/uploads/${id}.${ext}`
	return NextResponse.json({ url })
}