import { getDb, upsertSetting } from './db'
import { slugify } from './slug'

export async function seed() {
	const db = await getDb()
	if (db.data!.states.length > 0) return // already seeded

	// Settings
	await upsertSetting('posterRotationMs', String(4000))
	await upsertSetting('logoUrl', '/favicon.ico')

	// States
	const states = [
		{ name: 'Jammu & Kashmir', aliases: [], description: 'Paradise on earth with valleys and mountains', coverImageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'Ladakh', aliases: ['laddakh'], description: 'High-altitude desert known for monasteries and passes', coverImageUrl: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'Himachal Pradesh', aliases: [], description: 'Hills, apple orchards, and adventure sports', coverImageUrl: 'https://images.unsplash.com/photo-1519680772-8b475e6e2e82?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'Wayanad', aliases: ['waynard'], description: 'Kerala’s green district with wildlife and waterfalls', coverImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'South India', aliases: [], description: 'Curated group across Tamil Nadu, Kerala, Karnataka, Andhra', coverImageUrl: 'https://images.unsplash.com/photo-1518544801976-3e1783b2f138?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'Ujjain & Omkareshwar', aliases: [], description: 'Spiritual centers on the Shipra and Narmada rivers', coverImageUrl: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop' },
		{ name: 'Pachmarhi', aliases: ['panchmani'], description: 'Madhya Pradesh’s hill station with caves and falls', coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
	]

	for (const s of states) {
		const now = new Date().toISOString()
		db.data!.states.push({
			id: crypto.randomUUID(),
			name: s.name,
			slug: slugify(s.name),
			aliases: s.aliases,
			description: s.description,
			coverImageUrl: s.coverImageUrl,
			featuredPlaceName: undefined,
			createdAt: now,
			updatedAt: now,
		})
	}

	// Places (a few samples)
	const jnk = db.data!.states.find(s => s.slug === 'jammu-kashmir')!
	db.data!.places.push({
		id: crypto.randomUUID(),
		stateId: jnk.id,
		name: 'Gulmarg',
		slug: 'gulmarg',
		aliases: [],
		description: 'Meadows, skiing, the Gulmarg Gondola',
		imageUrls: ['https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop'],
		city: 'Gulmarg',
		theme: 'adventure',
		budget: 'mid',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	})

	// Posters
	db.data!.posters.push(
		{ id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', title: 'Explore India', order: 1, active: true },
		{ id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop', title: 'Mountains', order: 2, active: true },
		{ id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1518544801976-3e1783b2f138?q=80&w=1600&auto=format&fit=crop', title: 'Coasts', order: 3, active: true },
	)

	// Services
	db.data!.services.push(
		{ id: crypto.randomUUID(), name: 'Hotel Booking', icon: 'hotel', description: 'Hotels in any state with best rates', active: true },
		{ id: crypto.randomUUID(), name: 'Car & Bus Travel', icon: 'car', description: 'Comfortable travel arrangements', active: true },
		{ id: crypto.randomUUID(), name: 'Catering', icon: 'utensils', description: 'Quality catering for trips', active: true },
	)

	await db.write()
}

if (require.main === module) {
	seed().then(() => console.log('Seed complete')).catch(err => {
		console.error(err)
		process.exit(1)
	})
}