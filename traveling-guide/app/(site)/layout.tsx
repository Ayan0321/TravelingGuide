import Link from 'next/link'
import { ReactNode } from 'react'
import { getLogoUrl } from '@/lib/settings'
import SearchBox from '@/components/SearchBox'

export default async function SiteLayout({ children }: { children: ReactNode }) {
	const logo = await getLogoUrl()
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
					<Link href="/" className="flex items-center gap-2">
						<img src={logo} alt="Traveling Guide logo" className="h-8 w-8 rounded" />
						<span className="font-semibold text-lg">Traveling Guide</span>
					</Link>
					<nav className="ml-auto hidden md:flex gap-6 text-sm">
						<Link className="hover:text-blue-600" href="/">Home</Link>
						<Link className="hover:text-blue-600" href="/about">About</Link>
						<Link className="hover:text-blue-600" href="/states">States</Link>
						<Link className="hover:text-blue-600" href="/services">Services</Link>
						<Link className="hover:text-blue-600" href="/contact">Contact</Link>
					</nav>
					<div className="ml-4 flex-1 max-w-xs">
						<SearchBox />
					</div>
				</div>
			</header>
			<main className="flex-1">{children}</main>
			<footer className="border-t border-zinc-200 bg-zinc-50">
				<div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-zinc-600">
					<div>
						<div className="font-semibold text-zinc-800 mb-2">Traveling Guide</div>
						<p>Reliable travel planning across India. High-impact photography and local expertise.</p>
					</div>
					<div>
						<div className="font-semibold text-zinc-800 mb-2">Quick Links</div>
						<ul className="space-y-1">
							<li><Link href="/states" className="hover:text-blue-600">States</Link></li>
							<li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
							<li><Link href="/about" className="hover:text-blue-600">About</Link></li>
							<li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
						</ul>
					</div>
					<div>
						<div className="font-semibold text-zinc-800 mb-2">Contact</div>
						<p>Email: hello@example.com</p>
						<p>Phone: +91 99999 99999</p>
						<div className="mt-2 flex gap-3">
							<a href="#" aria-label="Instagram" className="hover:text-blue-600">Instagram</a>
							<a href="#" aria-label="Facebook" className="hover:text-blue-600">Facebook</a>
							<a href="#" aria-label="X" className="hover:text-blue-600">X</a>
						</div>
					</div>
				</div>
				<div className="text-center text-xs text-zinc-500 py-4">© {new Date().getFullYear()} Traveling Guide</div>
			</footer>
		</div>
	)
}