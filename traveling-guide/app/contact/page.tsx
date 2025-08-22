"use client"

export default function ContactPage() {
	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = new FormData(e.currentTarget)
		const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(form as any)), headers: { 'Content-Type': 'application/json' } })
		if (res.ok) alert('Message sent! (stubbed)')
	}
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">Contact</h1>
			<div className="grid md:grid-cols-2 gap-6">
				<form onSubmit={submit} className="space-y-3">
					<input name="name" required placeholder="Your name" className="w-full rounded border border-zinc-300 px-3 py-2" />
					<input name="email" type="email" placeholder="Email" className="w-full rounded border border-zinc-300 px-3 py-2" />
					<input name="phone" required placeholder="Phone" className="w-full rounded border border-zinc-300 px-3 py-2" />
					<textarea name="message" required placeholder="Message" className="w-full rounded border border-zinc-300 px-3 py-2" rows={5} />
					<button className="rounded bg-blue-600 text-white py-2 px-4">Send</button>
				</form>
				<div className="rounded-xl bg-zinc-50 p-6 text-sm text-zinc-600">Map embed placeholder</div>
			</div>
		</div>
	)
}