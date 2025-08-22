"use client"
import { useEffect, useState } from 'react'

export default function ServicesPage() {
	const [services, setServices] = useState<any[]>([])
	useEffect(() => { fetch('/api/services').then(r=>r.json()).then(d=> setServices(d.items)) }, [])
	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = new FormData(e.currentTarget)
		const res = await fetch('/api/quote', { method: 'POST', body: JSON.stringify(Object.fromEntries(form as any)), headers: { 'Content-Type': 'application/json' } })
		if (res.ok) alert('Quote request submitted! (stubbed)')
	}
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">Services</h1>
			<div className="grid sm:grid-cols-3 gap-6">
				{services.filter(s=>s.active).map(s => (
					<div key={s.id} className="rounded-xl bg-white p-5 shadow">
						<div className="font-semibold">{s.name}</div>
						<p className="text-sm text-zinc-600 mt-1">{s.description}</p>
					</div>
				))}
			</div>
			<div className="mt-10">
				<h2 className="text-xl font-semibold mb-3">Get a Quote</h2>
				<form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
					<input name="name" required placeholder="Your name" className="rounded border border-zinc-300 px-3 py-2" />
					<input name="email" type="email" placeholder="Email" className="rounded border border-zinc-300 px-3 py-2" />
					<input name="phone" required placeholder="Phone" className="rounded border border-zinc-300 px-3 py-2" />
					<input name="dates" placeholder="Travel dates" className="rounded border border-zinc-300 px-3 py-2" />
					<input name="states" placeholder="States of interest" className="rounded border border-zinc-300 px-3 py-2 md:col-span-2" />
					<select name="service" className="rounded border border-zinc-300 px-3 py-2">
						<option>Hotel Booking</option>
						<option>Car & Bus Travel</option>
						<option>Catering</option>
					</select>
					<textarea name="message" placeholder="Message" className="rounded border border-zinc-300 px-3 py-2 md:col-span-2" rows={4} />
					<button className="rounded bg-blue-600 text-white py-2 md:col-span-2">Submit</button>
				</form>
			</div>
		</div>
	)
}