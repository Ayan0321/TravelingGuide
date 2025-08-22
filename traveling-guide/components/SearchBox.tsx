"use client"
import { useEffect, useRef, useState } from 'react'

export default function SearchBox() {
	const [q, setQ] = useState('')
	const [items, setItems] = useState<any[]>([])
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as any)) setOpen(false) }
		document.addEventListener('mousedown', onDoc)
		return () => document.removeEventListener('mousedown', onDoc)
	}, [])
	useEffect(() => {
		const id = setTimeout(() => {
			if (q.trim().length === 0) { setItems([]); return }
			fetch(`/api/search?q=${encodeURIComponent(q)}`).then(r=>r.json()).then(d=> { setItems(d.items.slice(0,6)); setOpen(true) })
		}, 200)
		return () => clearTimeout(id)
	}, [q])
	return (
		<div ref={ref} className="relative max-w-xs w-full">
			<form action="/search">
				<input name="q" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search states & places" className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Search" />
			</form>
			{open && items.length > 0 && (
				<div className="absolute mt-2 w-full rounded-xl border bg-white shadow z-50">
					<ul className="max-h-72 overflow-auto">
						{items.map((it:any) => (
							<li key={`${it.type}-${it.id}`}>
								<a href={it.href} className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50">
									<img src={it.imageUrl || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=200&auto=format&fit=crop'} alt="" className="h-8 w-10 object-cover rounded" />
									<div className="text-sm">
										<div className="font-medium">{it.name}</div>
										{it.stateName && <div className="text-xs text-zinc-600">{it.stateName}</div>}
									</div>
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}