"use client"
import { useEffect, useState } from 'react'

export default function AdminPlaces() {
	const [states, setStates] = useState<any[]>([])
	const [places, setPlaces] = useState<any[]>([])
	useEffect(() => { init() }, [])
	async function init(){
		const s = await fetch('/api/states').then(r=>r.json()); setStates(s.items)
		const p = await fetch('/api/places').then(r=>r.json()); setPlaces(p.items)
	}
	async function create(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		let imageUrls: string[] = []
		const files = (e.currentTarget.elements.namedItem('images') as HTMLInputElement).files
		if (files && files.length) {
			for (const file of Array.from(files)) {
				const uf = new FormData(); uf.append('file', file)
				const up = await fetch('/api/upload', { method: 'POST', body: uf })
				const u = await up.json(); imageUrls.push(u.url)
			}
		}
		const body = {
			stateId: f.get('stateId'),
			name: f.get('name'),
			description: f.get('description')||'',
			imageUrls,
			aliases: String(f.get('aliases')||'').split(',').map(s=>s.trim()).filter(Boolean),
			city: f.get('city')||undefined,
			theme: f.get('theme')||undefined,
			budget: f.get('budget')||undefined,
		}
		const res = await fetch('/api/places', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(body) })
		if (res.ok) { e.currentTarget.reset(); init() }
	}
	return (
		<div>
			<h2 className="text-lg font-semibold mb-3">Places</h2>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-3">
					{places.map(p => (
						<div key={p.id} className="rounded border p-3">
							<div className="font-medium">{p.name}</div>
							<div className="text-xs text-zinc-600">State: {states.find(s=>s.id===p.stateId)?.name || p.stateId}</div>
						</div>
					))}
				</div>
				<form onSubmit={create} className="space-y-3 rounded border p-4">
					<div className="font-medium">Create Place</div>
					<select name="stateId" required className="w-full rounded border px-3 py-2">
						<option value="">Select state</option>
						{states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
					</select>
					<input name="name" placeholder="Name" required className="w-full rounded border px-3 py-2" />
					<textarea name="description" placeholder="Description" className="w-full rounded border px-3 py-2" />
					<input name="aliases" placeholder="Aliases (comma-separated)" className="w-full rounded border px-3 py-2" />
					<div className="grid grid-cols-3 gap-3">
						<input name="city" placeholder="City" className="rounded border px-3 py-2" />
						<input name="theme" placeholder="Theme" className="rounded border px-3 py-2" />
						<select name="budget" className="rounded border px-3 py-2">
							<option value="">Budget</option>
							<option value="budget">Budget</option>
							<option value="mid">Mid</option>
							<option value="luxury">Luxury</option>
						</select>
					</div>
					<div>
						<label className="text-sm">Upload images</label>
						<input type="file" name="images" accept="image/*" multiple className="block mt-1" />
					</div>
					<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Create</button>
				</form>
			</div>
		</div>
	)
}