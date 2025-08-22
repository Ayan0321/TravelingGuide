import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-xl font-semibold">Admin</h1>
				<form action="/api/auth/logout" method="post">
					<button className="rounded bg-zinc-900 text-white px-3 py-1.5 text-sm">Logout</button>
				</form>
			</div>
			<nav className="flex gap-4 text-sm mb-6">
				<Link href="/admin">Dashboard</Link>
				<Link href="/admin/states">States</Link>
				<Link href="/admin/places">Places</Link>
				<Link href="/admin/posters">Posters</Link>
				<Link href="/admin/services">Services</Link>
				<Link href="/admin/settings">Settings</Link>
			</nav>
			{children}
		</div>
	)
}