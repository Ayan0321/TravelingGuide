"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginForm() {
	const [error, setError] = useState<string>('')
	const router = useRouter()
	const params = useSearchParams()
	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = new FormData(e.currentTarget)
		const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: form.get('password') }) })
		if (res.ok) {
			const next = params.get('next') || '/admin'
			router.replace(next)
		} else {
			const data = await res.json()
			setError(data.error || 'Login failed')
		}
	}
	return (
		<div className="max-w-sm mx-auto px-4 py-16">
			<h1 className="text-xl font-semibold mb-4">Admin Login</h1>
			<form onSubmit={submit} className="space-y-3">
				<input name="password" type="password" placeholder="Password" className="w-full rounded border border-zinc-300 px-3 py-2" required />
				{error && <div className="text-sm text-red-600">{error}</div>}
				<button className="rounded bg-blue-600 text-white px-4 py-2">Login</button>
			</form>
		</div>
	)
}