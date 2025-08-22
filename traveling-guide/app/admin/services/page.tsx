"use client"
import { useEffect, useState } from 'react'

export default function AdminServices() {
	const [items, setItems] = useState<any[]>([])
	useEffect(() => { refresh() }, [])
	async function refresh(){ const r = await fetch('/api/services'); const d = await r.json(); setItems(d.items) }
	async function add(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		await fetch('/api/services', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ name: f.get('name'), icon: f.get('icon')||'star', description: f.get('description')||'', active: true }) })
		e.currentTarget.reset(); refresh()
	}
	return (
		<div>
			<h2 className="text-lg font-semibold mb-3">Services</h2>
			<div className="space-y-3 mb-6">
				{items.map(s => (
					<div key={s.id} className="rounded border p-3">
						<div className="font-medium">{s.name}</div>
						<div className="text-sm text-zinc-600">{s.description}</div>
					</div>
				))}
			</div>
			<form onSubmit={add} className="space-y-3 rounded border p-4">
				<div className="font-medium">Add Service</div>
				<input name="name" placeholder="Name" required className="w-full rounded border px-3 py-2" />
				<input name="icon" placeholder="Icon name" className="w-full rounded border px-3 py-2" />
				<textarea name="description" placeholder="Description" className="w-full rounded border px-3 py-2" />
				<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Add</button>
			</form>
		</div>
	)
}