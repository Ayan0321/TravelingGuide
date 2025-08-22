"use client"
import { useEffect, useMemo, useState } from 'react'

interface PosterResponse { items: { id: string, imageUrl: string, title?: string, order: number, active: boolean }[], rotationMs: number }

export default function HomePage() {
	const [posters, setPosters] = useState<PosterResponse['items']>([])
	const [rotationMs, setRotationMs] = useState<number>(4000)
	const [paused, setPaused] = useState(false)
	const [index, setIndex] = useState(0)

	useEffect(() => {
		fetch('/api/posters').then(r => r.json()).then((d: PosterResponse) => {
			setPosters(d.items.filter(p => p.active).sort((a,b) => a.order - b.order))
			setRotationMs(d.rotationMs || 4000)
		})
	}, [])

	useEffect(() => {
		if (paused || posters.length === 0) return
		const id = setInterval(() => setIndex(i => (i + 1) % posters.length), rotationMs)
		return () => clearInterval(id)
	}, [paused, posters, rotationMs])

	return (
		<div>
			<section className="relative h-[60vh] md:h-[70vh] overflow-hidden" aria-label="Hero">
				{posters.map((p, i) => (
					<img key={p.id} src={p.imageUrl} alt={p.title || 'Travel poster'}
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
					/>
				))}
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
				<div className="absolute inset-0 flex items-center justify-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
					<div className="text-center text-white px-4">
						<h1 className="text-3xl md:text-5xl font-semibold drop-shadow">Discover Incredible India</h1>
						<p className="mt-3 md:mt-4 text-sm md:text-base opacity-90">Personalized trips, local expertise, and 24×7 support</p>
						<div className="mt-5 flex items-center justify-center gap-3">
							<a href="/states" className="rounded-full bg-white text-zinc-900 px-5 py-2 text-sm font-medium shadow hover:shadow-md">Explore States</a>
							<a href="/contact" className="rounded-full bg-blue-600 text-white px-5 py-2 text-sm font-medium shadow hover:bg-blue-700">Contact</a>
						</div>
					</div>
				</div>
			</section>

			<section className="max-w-6xl mx-auto px-4 py-10">
				<h2 className="text-xl font-semibold mb-4">Highlighted Destinations</h2>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[
						{ title: 'Jammu & Kashmir', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop', href: '/states/jammu-kashmir', blurb: 'Paradise on earth with stunning valleys.' },
						{ title: 'Ladakh', img: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=800&auto=format&fit=crop', href: '/states/ladakh', blurb: 'Monasteries, passes and stark landscapes.' },
						{ title: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1519680772-8b475e6e2e82?q=80&w=800&auto=format&fit=crop', href: '/states/himachal-pradesh', blurb: 'Hill towns and adventure sports.' },
						{ title: 'Wayanad', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop', href: '/states/wayanad', blurb: 'Green district with wildlife and waterfalls.' },
						{ title: 'South India', img: 'https://images.unsplash.com/photo-1518544801976-3e1783b2f138?q=80&w=800&auto=format&fit=crop', href: '/states/south-india', blurb: 'Curated group across the south.' },
						{ title: 'Ujjain & Omkareshwar', img: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=800&auto=format&fit=crop', href: '/states/ujjain-omkareshwar', blurb: 'Spiritual centers on sacred rivers.' },
						{ title: 'Pachmarhi', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop', href: '/states/pachmarhi', blurb: 'Caves, falls and hill landscapes.' },
					].map((c) => (
						<a key={c.title} href={c.href} className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
							<img src={c.img} alt={c.title} className="h-44 w-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy" />
							<div className="p-4">
								<div className="font-semibold">{c.title}</div>
								<p className="text-sm text-zinc-600 mt-1">{c.blurb}</p>
								<div className="mt-3 text-sm text-blue-600">View More →</div>
							</div>
						</a>
					))}
				</div>
			</section>

			<section className="bg-zinc-50">
				<div className="max-w-6xl mx-auto px-4 py-10">
					<h2 className="text-xl font-semibold mb-4">Why Travel With Us</h2>
					<div className="grid sm:grid-cols-3 gap-6">
						<div className="rounded-xl bg-white p-5 shadow-sm">
							<div className="font-semibold">Reliability</div>
							<p className="text-sm text-zinc-600">Trusted planning with transparent pricing.</p>
						</div>
						<div className="rounded-xl bg-white p-5 shadow-sm">
							<div className="font-semibold">Local Expertise</div>
							<p className="text-sm text-zinc-600">Itineraries by people who know the land.</p>
						</div>
						<div className="rounded-xl bg-white p-5 shadow-sm">
							<div className="font-semibold">24×7 Support</div>
							<p className="text-sm text-zinc-600">We are with you throughout your journey.</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
