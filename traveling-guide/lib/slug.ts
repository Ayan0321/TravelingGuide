export function slugify(input: string): string {
	return input
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export function normalizeAlias(input: string): string {
	return input.trim().toLowerCase();
}

export function matchesByAlias(value: string, aliases: string[]): boolean {
	const needle = normalizeAlias(value);
	return aliases.map(normalizeAlias).includes(needle);
}