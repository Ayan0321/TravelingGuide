import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { DatabaseSchema, Setting, State, Place, Poster, Service } from './types'
import { slugify } from './slug'
import { randomUUID } from 'crypto'
import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.join(process.cwd(), 'data')
const dbFile = path.join(dataDir, 'db.json')

function ensureDirs() {
	if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
}

let db: Low<DatabaseSchema> | null = null

export async function getDb() {
	if (db) return db
	ensureDirs()
	const adapter = new JSONFile<DatabaseSchema>(dbFile)
	db = new Low<DatabaseSchema>(adapter, { states: [], places: [], posters: [], services: [], settings: [] })
	await db.read()
	if (!db.data) {
		db.data = { states: [], places: [], posters: [], services: [], settings: [] }
		await db.write()
	}
	return db
}

export async function upsertSetting(key: string, value: string) {
	const database = await getDb()
	const existing = database.data!.settings.find(s => s.key === key)
	if (existing) existing.value = value
	else database.data!.settings.push({ key, value })
	await database.write()
}

export async function getSetting(key: string, fallback?: string): Promise<string | undefined> {
	const database = await getDb()
	return database.data!.settings.find(s => s.key === key)?.value ?? fallback
}

export async function createState(input: { name: string; description: string; coverImageUrl: string; featuredPlaceName?: string; aliases?: string[] }) {
	const database = await getDb()
	const now = new Date().toISOString()
	const state: State = {
		id: randomUUID(),
		name: input.name,
		slug: slugify(input.name),
		description: input.description,
		coverImageUrl: input.coverImageUrl,
		createdAt: now,
		updatedAt: now,
		aliases: input.aliases || [],
		featuredPlaceName: input.featuredPlaceName,
	}
	database.data!.states.push(state)
	await database.write()
	return state
}

export async function updateState(id: string, patch: Partial<State>) {
	const database = await getDb()
	const item = database.data!.states.find(s => s.id === id)
	if (!item) return null
	Object.assign(item, patch, { updatedAt: new Date().toISOString() })
	await database.write()
	return item
}

export async function deleteState(id: string) {
	const database = await getDb()
	database.data!.states = database.data!.states.filter(s => s.id !== id)
	// also delete places under it
	database.data!.places = database.data!.places.filter(p => p.stateId !== id)
	await database.write()
}

export async function createPlace(input: { stateId: string; name: string; description: string; imageUrls?: string[]; aliases?: string[]; city?: string; theme?: string; budget?: 'budget' | 'mid' | 'luxury' }) {
	const database = await getDb()
	const now = new Date().toISOString()
	const place: Place = {
		id: randomUUID(),
		stateId: input.stateId,
		name: input.name,
		slug: slugify(input.name),
		description: input.description,
		imageUrls: input.imageUrls || [],
		aliases: input.aliases || [],
		city: input.city,
		theme: input.theme,
		budget: input.budget,
		createdAt: now,
		updatedAt: now,
	}
	database.data!.places.push(place)
	await database.write()
	return place
}

export async function updatePlace(id: string, patch: Partial<Place>) {
	const database = await getDb()
	const item = database.data!.places.find(p => p.id === id)
	if (!item) return null
	Object.assign(item, patch, { updatedAt: new Date().toISOString() })
	await database.write()
	return item
}

export async function deletePlace(id: string) {
	const database = await getDb()
	database.data!.places = database.data!.places.filter(p => p.id !== id)
	await database.write()
}

export async function upsertPoster(input: Omit<Poster, 'id'> & { id?: string }) {
	const database = await getDb()
	if (input.id) {
		const existing = database.data!.posters.find(p => p.id === input.id)
		if (existing) {
			Object.assign(existing, input)
			await database.write()
			return existing
		}
	}
	const poster: Poster = { id: randomUUID(), ...input }
	database.data!.posters.push(poster)
	await database.write()
	return poster
}

export async function deletePoster(id: string) {
	const database = await getDb()
	database.data!.posters = database.data!.posters.filter(p => p.id !== id)
	await database.write()
}

export async function upsertService(input: Omit<Service, 'id'> & { id?: string }) {
	const database = await getDb()
	if (input.id) {
		const existing = database.data!.services.find(s => s.id === input.id)
		if (existing) {
			Object.assign(existing, input)
			await database.write()
			return existing
		}
	}
	const service: Service = { id: randomUUID(), ...input }
	database.data!.services.push(service)
	await database.write()
	return service
}

export async function deleteService(id: string) {
	const database = await getDb()
	database.data!.services = database.data!.services.filter(s => s.id !== id)
	await database.write()
}