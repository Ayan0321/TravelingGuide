import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { normalizeAlias } from '@/lib/slug'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const q = (searchParams.get('q') || '').trim()
	if (!q) return NextResponse.json({ items: [] })
	const needle = normalizeAlias(q)
	const db = await getDb()
	const items = [] as any[]

	for (const s of db.data!.states) {
		const names = [s.name, s.slug, ...s.aliases]
		if (names.map(n => normalizeAlias(n)).some(n => n.includes(needle))) {
			items.push({ type: 'state', id: s.id, name: s.name, slug: s.slug, href: `/states/${s.slug}`, imageUrl: s.coverImageUrl })
		}
	}
	for (const p of db.data!.places) {
		const names = [p.name, p.slug, ...p.aliases]
		if (names.map(n => normalizeAlias(n)).some(n => n.includes(needle))) {
			const state = db.data!.states.find(s => s.id === p.stateId)
			items.push({ type: 'place', id: p.id, name: p.name, slug: p.slug, href: `/states/${state?.slug}#${p.slug}` , imageUrl: p.imageUrls[0], stateName: state?.name })
		}
	}

	return NextResponse.json({ items })
}