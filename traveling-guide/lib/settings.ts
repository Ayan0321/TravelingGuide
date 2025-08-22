import { getSetting } from './db'

export async function getLogoUrl() {
	return (await getSetting('logoUrl')) || '/favicon.ico'
}

export async function getPosterRotationMs() {
	return Number((await getSetting('posterRotationMs')) || '4000')
}