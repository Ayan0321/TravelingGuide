export default function AboutPage() {
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-4">About</h1>
			<p className="text-zinc-700 max-w-3xl">I am a traveling guide across India, helping travelers craft memorable itineraries with reliable planning, local expertise, and 24×7 support.</p>
			<div className="grid md:grid-cols-3 gap-6 mt-8">
				<div className="rounded-xl bg-white p-5 shadow">
					<div className="font-semibold">Mission</div>
					<p className="text-sm text-zinc-600 mt-1">Deliver exceptional journeys tailored to your interests and budget.</p>
				</div>
				<div className="rounded-xl bg-white p-5 shadow">
					<div className="font-semibold">Experience</div>
					<p className="text-sm text-zinc-600 mt-1">Years of on-ground knowledge across India’s diverse regions.</p>
				</div>
				<div className="rounded-xl bg-white p-5 shadow">
					<div className="font-semibold">Commitment</div>
					<p className="text-sm text-zinc-600 mt-1">Transparent communication, safety, and support throughout.</p>
				</div>
			</div>
			<div className="mt-10 rounded-xl bg-zinc-50 p-6 text-sm text-zinc-600">Testimonial slider coming soon.</div>
		</div>
	)
}