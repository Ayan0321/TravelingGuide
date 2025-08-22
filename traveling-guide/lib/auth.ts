import { cookies } from 'next/headers'

const COOKIE_NAME = 'tg_admin'

export async function isAdmin() {
	const cookieStore = await cookies()
	return cookieStore.get(COOKIE_NAME)?.value === '1'
}

export async function requireAdmin() {
	if (!(await isAdmin())) throw new Error('Unauthorized')
}

export function getAdminPassword(): string {
	return process.env.ADMIN_PASSWORD || 'admin123'
}

export const ADMIN_COOKIE = COOKIE_NAME