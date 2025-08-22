import { notFound } from 'next/navigation'

async function fetchStateAndPlaces(slug: string) {
	const statesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/states`, { cache: 'no-store' })
	const { items: states } = await statesRes.json()
	const state = (states as any[]).find(s => s.slug === slug)
	if (!state) return null
	const placesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/places`, { cache: 'no-store' })
	const { items: places } = await placesRes.json()
	return { state, places: (places as any[]).filter((p:any) => p.stateId === state.id) }
}

export default async function StateDetailPage({ params }: { params: { slug: string } }) {
	const data = await fetchStateAndPlaces(params.slug)
	if (!data) return notFound()
	const { state, places } = data

	return (
		<div>
			<section className="relative h-64 md:h-80">
				<img src={state.coverImageUrl} alt={state.name} className="absolute inset-0 w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute inset-0 max-w-6xl mx-auto px-4 flex items-end pb-6">
					<h1 className="text-3xl md:text-4xl font-semibold text-white drop-shadow">{state.name}</h1>
				</div>
			</section>
			<section className="max-w-6xl mx-auto px-4 py-8">
				<p className="text-zinc-700 max-w-3xl">{state.description}</p>
				<div className="mt-6 grid md:grid-cols-4 gap-6">
					<div className="md:col-span-1">
						<div className="sticky top-24 space-y-3">
							<form className="space-y-3" action="#">
								<input name="q" placeholder="Search places" className="w-full rounded border border-zinc-300 px-3 py-2 text-sm" />
								<select name="theme" className="w-full rounded border border-zinc-300 px-3 py-2 text-sm">
									<option value="">All themes</option>
									<option value="adventure">Adventure</option>
									<option value="heritage">Heritage</option>
									<option value="nature">Nature</option>
								</select>
								<select name="budget" className="w-full rounded border border-zinc-300 px-3 py-2 text-sm">
									<option value="">Any budget</option>
									<option value="budget">Budget</option>
									<option value="mid">Mid</option>
									<option value="luxury">Luxury</option>
								</select>
								<button className="w-full rounded bg-blue-600 text-white py-2 text-sm">Apply</button>
							</form>
						</div>
					</div>
					<div className="md:col-span-3 grid sm:grid-cols-2 gap-6">
						{places.map((p:any) => (
							<div key={p.id} id={p.slug} className="rounded-xl overflow-hidden bg-white shadow">
								<img src={p.imageUrls?.[0] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop'} alt={p.name} className="h-44 w-full object-cover" loading="lazy" />
								<div className="p-4">
									<div className="font-semibold">{p.name}</div>
									<p className="text-sm text-zinc-600 mt-1">{p.description}</p>
									<button className="mt-3 rounded-full bg-zinc-900 text-white px-4 py-1.5 text-sm">Add to plan</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}