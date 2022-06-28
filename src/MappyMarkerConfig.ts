export interface MappyMarkerConfig {
	lat: number;
	lng: number;
	icon?: { url?: string, width?: number, height?: number };
}

export const MappyMarkerConfigDefault: MappyMarkerConfig = {
	lat: -0.6058936613783388,
	lng: 114.22502294088073,
}