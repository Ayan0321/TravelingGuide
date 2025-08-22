"use client"

export default function AdminDashboard() {
	async function seedNow() {
		await fetch('/api/seed', { method: 'POST' })
		alert('Seeded!')
	}
	return (
		<div>
			<div className="rounded-xl bg-white p-6 shadow">
				<div className="font-semibold mb-2">Welcome to Admin</div>
				<p className="text-sm text-zinc-600">Use the navigation to manage content. You can also reseed demo data.</p>
				<div className="mt-4">
					<button onClick={seedNow} className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Seed demo data</button>
				</div>
			</div>
		</div>
	)
}