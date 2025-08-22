"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
	const [items, setItems] = useState<any[]>([])
	const q = searchParams.q || ''
	useEffect(() => {
		if (!q) { setItems([]); return }
		fetch(`/api/search?q=${encodeURIComponent(q)}`).then(r=>r.json()).then(d=> setItems(d.items))
	}, [q])
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">Search</h1>
			<p className="text-sm text-zinc-600 mb-4">Results for “{q}”</p>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{items.map((it) => (
					<Link key={`${it.type}-${it.id}`} href={it.href} className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
						<img src={it.imageUrl || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop'} alt={it.name} className="h-44 w-full object-cover" />
						<div className="p-4">
							<div className="font-semibold">{it.name}</div>
							{it.stateName && <div className="text-xs text-zinc-600 mt-1">{it.stateName}</div>}
							<div className="mt-3 text-sm text-blue-600">View →</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}