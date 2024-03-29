export interface MappyConfig {
	lat: number;
	lng: number;
	zoom?: number;
	onClick?: Function;
	onMove?: Function;
	onZoom?: Function;
}

export const MappyConfigDefault: MappyConfig = {
	lat: -0.6058936613783388,
	lng: 114.22502294088073,
	zoom: 5,
}