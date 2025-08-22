"use client"
import { useEffect, useState } from 'react'

export default function AdminPosters() {
	const [items, setItems] = useState<any[]>([])
	const [rotationMs, setRotationMs] = useState(4000)
	useEffect(() => { refresh() }, [])
	async function refresh() {
		const r = await fetch('/api/posters')
		const d = await r.json()
		setItems(d.items)
		setRotationMs(d.rotationMs)
	}
	async function add(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		let imageUrl = String(f.get('imageUrl') || '')
		const file = (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]
		if (file) { const uf = new FormData(); uf.append('file', file); const up = await fetch('/api/upload',{method:'POST',body:uf}); const u = await up.json(); imageUrl = u.url }
		await fetch('/api/posters', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ imageUrl, title: f.get('title')||undefined, order: Number(f.get('order')||0), active: true }) })
		e.currentTarget.reset(); refresh()
	}
	async function remove(id: string){ await fetch(`/api/posters/${id}`, { method: 'DELETE' }); refresh() }
	async function saveRotation(e: React.FormEvent){ e.preventDefault(); await fetch('/api/posters', { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rotationMs }) }); alert('Saved'); }
	return (
		<div>
			<h2 className="text-lg font-semibold mb-3">Posters</h2>
			<div className="space-y-3 mb-6">
				{items.map(p => (
					<div key={p.id} className="rounded border p-3 flex items-center gap-3">
						<img src={p.imageUrl} alt="" className="h-12 w-20 object-cover rounded" />
						<div className="flex-1">
							<div className="font-medium">{p.title || 'Untitled'}</div>
							<div className="text-xs text-zinc-600">Order {p.order}</div>
						</div>
						<button onClick={()=>remove(p.id)} className="text-sm text-red-600">Delete</button>
					</div>
				))}
			</div>
			<form onSubmit={add} className="space-y-3 rounded border p-4">
				<div className="font-medium">Add Poster</div>
				<input name="title" placeholder="Title" className="w-full rounded border px-3 py-2" />
				<input name="order" type="number" placeholder="Order" className="w-full rounded border px-3 py-2" />
				<input name="imageUrl" placeholder="Image URL (optional if upload)" className="w-full rounded border px-3 py-2" />
				<div>
					<label className="text-sm">Upload image</label>
					<input type="file" name="image" accept="image/*" className="block mt-1" />
				</div>
				<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Add</button>
			</form>
			<form onSubmit={saveRotation} className="mt-6 rounded border p-4 flex items-center gap-3">
				<label>Rotation (ms)</label>
				<input value={rotationMs} onChange={e=>setRotationMs(Number(e.target.value))} type="number" className="rounded border px-3 py-2 w-32" />
				<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Save</button>
			</form>
		</div>
	)
}