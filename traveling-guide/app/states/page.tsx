import Link from 'next/link'

async function fetchStates() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/states`, { cache: 'no-store' })
	const data = await res.json()
	return data.items as Array<{ id: string, name: string, slug: string, coverImageUrl: string, featuredPlaceName?: string }>
}

export default async function StatesPage() {
	const states = await fetchStates()
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">States</h1>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{states.map((s) => (
					<Link key={s.id} href={`/states/${s.slug}`} className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
						<img src={s.coverImageUrl} alt={s.name} className="h-44 w-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy" />
						<div className="p-4">
							<div className="font-semibold">{s.name}</div>
							{s.featuredPlaceName && <div className="text-xs text-zinc-600 mt-1">Featured: {s.featuredPlaceName}</div>}
							<div className="mt-3 text-sm text-blue-600">View More →</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}