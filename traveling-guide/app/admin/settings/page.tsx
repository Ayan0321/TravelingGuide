"use client"
import { useEffect, useState } from 'react'

export default function AdminSettings() {
	const [rotationMs, setRotationMs] = useState(4000)
	const [logoUrl, setLogoUrl] = useState('/logo.png')
	useEffect(() => { init() }, [])
	async function init(){
		const p = await fetch('/api/posters').then(r=>r.json())
		setRotationMs(p.rotationMs)
	}
	async function saveRotation(e: React.FormEvent){ e.preventDefault(); await fetch('/api/posters', { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rotationMs }) }); alert('Saved') }
	async function uploadLogo(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		const file = (e.currentTarget.elements.namedItem('logo') as HTMLInputElement).files?.[0]
		if (!file) return
		const f = new FormData(); f.append('file', file)
		const up = await fetch('/api/upload', { method: 'POST', body: f })
		const u = await up.json(); setLogoUrl(u.url)
		await fetch('/api/settings/logo', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ url: u.url }) })
		alert('Logo updated')
	}
	return (
		<div>
			<h2 className="text-lg font-semibold mb-3">Settings</h2>
			<form onSubmit={saveRotation} className="rounded border p-4 flex items-center gap-3 mb-6">
				<label>Poster rotation (ms)</label>
				<input value={rotationMs} onChange={e=>setRotationMs(Number(e.target.value))} type="number" className="rounded border px-3 py-2 w-32" />
				<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Save</button>
			</form>
			<form onSubmit={uploadLogo} className="rounded border p-4">
				<div className="font-medium mb-2">Logo</div>
				<img src={logoUrl} alt="Logo" className="h-10 mb-3" />
				<input type="file" name="logo" accept="image/*" />
				<button className="ml-3 rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Upload</button>
			</form>
		</div>
	)
}