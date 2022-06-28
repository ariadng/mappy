import { MappyConfig, MappyConfigDefault } from "./MappyConfig";
import { Loader } from "@googlemaps/js-api-loader"
import MappyMap from "./MappyMap";
import MappyMarker from "./MappyMarker";
import { MappyMarkerConfig, MappyMarkerConfigDefault } from "./MappyMarkerConfig";

export default class Mappy {

	private static initialized: boolean = false;
	private static apiKey: string 		= "";

	public static instances: Mappy[] = [];

	// Library initialization
	static init(apiKey: string, callback?: Function) {
		this.apiKey = apiKey;

		// Load Google Maps script
		const loader = new Loader({
			apiKey: this.apiKey,
			version: "weekly",
		});
		loader.load().then(() => {
			this.initialized = true;
			if (callback) callback();
		});
	}

	// Instance
	public map?: google.maps.Map;
	public markers: MappyMarker[] = [];

	// Create new map instance
	constructor (id: string, config: MappyConfig = MappyConfigDefault) {

		if (!Mappy.initialized) {
			console.error(`Mappy is not initialized. Run Mappy.init() first.`);
			return;
		}

		const _config	= { ...MappyConfigDefault, ...config };
		const container = document.getElementById(id);

		if (!container) {
			console.error(`Element with id ${id} doesn't exist.`);
			return;
		}

		const mapElement = document.createElement("div");
		mapElement.classList.add("map");
		mapElement.style.width = "100%";
		mapElement.style.height = "100%";
		container.appendChild(mapElement);

		this.map = new google.maps.Map(mapElement as HTMLElement, {
			// Override default settings
			disableDefaultUI: true,
			// Map settings
			center	: { lat: _config.lat, lng: _config.lng },
			zoom	: _config.zoom,
		});

		Mappy.instances.push(this);

	}

	// Add a marker to map
	public addMarker(config: MappyMarkerConfig = MappyMarkerConfigDefault): void {
		const _config = { ...MappyMarkerConfigDefault, ...config};
		const marker = new MappyMarker(this.map!, _config);
		this.markers.push(marker);
	}

	

}