export type ISODateString = string;

export interface State {
	id: string;
	name: string;
	slug: string;
	aliases: string[];
	description: string;
	coverImageUrl: string;
	featuredPlaceName?: string;
	createdAt: ISODateString;
	updatedAt: ISODateString;
}

export interface Place {
	id: string;
	stateId: string;
	name: string;
	slug: string;
	aliases: string[];
	description: string;
	imageUrls: string[];
	city?: string;
	theme?: string;
	budget?: 'budget' | 'mid' | 'luxury';
	createdAt: ISODateString;
	updatedAt: ISODateString;
}

export interface Poster {
	id: string;
	imageUrl: string;
	title?: string;
	order: number;
	active: boolean;
}

export interface Service {
	id: string;
	name: string;
	icon: string; // icon name or inline SVG path key
	description: string;
	active: boolean;
}

export interface Setting {
	key: string;
	value: string;
}

export interface DatabaseSchema {
	states: State[];
	places: Place[];
	posters: Poster[];
	services: Service[];
	settings: Setting[];
}

export interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
}

export interface ApiError {
	error: string;
}

export interface SearchResultItem {
	type: 'state' | 'place';
	id: string;
	name: string;
	slug: string;
	href: string;
	highlight?: string;
	imageUrl?: string;
	stateName?: string; // for places
}