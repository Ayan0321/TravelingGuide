"use client"
import { useEffect, useState } from 'react'

export default function AdminStates() {
	const [items, setItems] = useState<any[]>([])
	useEffect(() => { refresh() }, [])
	async function refresh() {
		const r = await fetch('/api/states')
		const d = await r.json()
		setItems(d.items)
	}
	async function create(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		let coverImageUrl = String(f.get('coverImageUrl') || '')
		const file = (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]
		if (file) {
			const uf = new FormData()
			uf.append('file', file)
			const up = await fetch('/api/upload', { method: 'POST', body: uf })
			const u = await up.json()
			coverImageUrl = u.url
		}
		const body = {
			name: f.get('name'),
			description: f.get('description'),
			coverImageUrl,
			aliases: String(f.get('aliases')||'').split(',').map(s=>s.trim()).filter(Boolean),
			featuredPlaceName: f.get('featuredPlaceName') || undefined
		}
		const res = await fetch('/api/states', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
		if (res.ok) { e.currentTarget.reset(); refresh() }
	}
	return (
		<div>
			<h2 className="text-lg font-semibold mb-3">States</h2>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-3">
					{items.map(s => (
						<div key={s.id} className="rounded border p-3 flex gap-3 items-center">
							<img src={s.coverImageUrl} alt="" className="h-12 w-16 object-cover rounded" />
							<div className="flex-1">
								<div className="font-medium">{s.name}</div>
								<div className="text-xs text-zinc-600">{s.aliases?.join(', ')}</div>
							</div>
							<a href={`/states/${s.slug}`} className="text-blue-600 text-sm">View</a>
						</div>
					))}
				</div>
				<form onSubmit={create} className="space-y-3 rounded border p-4">
					<div className="font-medium">Create State</div>
					<input name="name" placeholder="Name" required className="w-full rounded border px-3 py-2" />
					<textarea name="description" placeholder="Description" className="w-full rounded border px-3 py-2" />
					<input name="aliases" placeholder="Aliases (comma-separated)" className="w-full rounded border px-3 py-2" />
					<input name="featuredPlaceName" placeholder="Featured place name" className="w-full rounded border px-3 py-2" />
					<input name="coverImageUrl" placeholder="Cover image URL (optional if uploading)" className="w-full rounded border px-3 py-2" />
					<div>
						<label className="text-sm">Upload cover image</label>
						<input type="file" name="image" accept="image/*" className="block mt-1" />
					</div>
					<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Create</button>
				</form>
			</div>
		</div>
	)
}