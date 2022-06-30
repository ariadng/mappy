import { MappyConfig, MappyConfigDefault } from "./MappyConfig";
import { Loader } from "@googlemaps/js-api-loader"
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
	public container?: HTMLElement;
	public map?: google.maps.Map;
	public markers: MappyMarker[] = [];
	private activePopups: any[] = [];
	public refPoint = {x: 0, y: 0, moveX: 0, moveY: 0};
	private refPointInitialized = false;
	public origin = { top: 0, left: 0, moveTop: 0, moveLeft: 0 };

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

		// – Origin
		const containerRect	= container.getBoundingClientRect();
		this.origin.top		= containerRect.top;
		this.origin.left	= containerRect.left;

		// Container
		this.container = container;
		this.container.style.position = "relative";
		this.container.style.overflow = "hidden";

		// Add map element
		const mapElement = document.createElement("div");
		mapElement.classList.add("map");
		mapElement.style.width = "100%";
		mapElement.style.height = "100%";
		this.container.appendChild(mapElement);

		this.map = new google.maps.Map(mapElement as HTMLElement, {
			// Override default settings
			disableDefaultUI: true,
			// Map settings
			center	: { lat: _config.lat, lng: _config.lng },
			zoom	: _config.zoom,
		});

		// Reference marker
		const refMarker = new google.maps.Marker({
			position: this.map.getCenter(),
			icon: {
				url: "",
				size: new google.maps.Size(0,0),
			}
		});
		refMarker.setMap(this.map);

		// Event listeners
		// - First time loaded
		this.map.addListener("tilesloaded", () => { this.onLoad() });
		// - Maps moved
		this.map.addListener("center_changed", () => { this.onMove() });
		// - Maps clicked
		this.map.addListener("click", () => { this.onClick() });
		
		// - Window Events
		window.addEventListener("resize", () => { this.closePopup(); })
		window.addEventListener("scroll", () => { this.onWindowScroll(); })

		Mappy.instances.push(this);

	}

	// Add a marker to map
	public addMarker(config: MappyMarkerConfig = MappyMarkerConfigDefault): void {
		const _config = { ...MappyMarkerConfigDefault, ...config};
		const marker = new MappyMarker(this, _config);
		this.markers.push(marker);
	}

	// Add element to container
	public addElement(element: HTMLElement): void {
		this.container?.appendChild(element);
	}

	private onLoad(): void {
		if (!this.refPointInitialized) {
			const ref = this.container?.querySelector("img");
			if (ref) {
				const rect = ref.getBoundingClientRect();
				this.refPoint.x = rect.x;
				this.refPoint.y = rect.y;
				this.refPointInitialized = true;
			}
		}
	}

	private onMove(): void {
		this.updateRefPoint();
	}
	private onClick(): void {
		this.closePopup();
	}

	private updateRefPoint(): void {
		const ref = this.container?.querySelector("img");
		if (ref) {
			const rect = ref.getBoundingClientRect();
			const moveX = rect.x - this.refPoint.x;
			const moveY = rect.y - this.refPoint.y;
			
			this.refPoint.moveX = moveX;
			this.refPoint.moveY = moveY;

			this.origin.moveTop		= moveY;
			this.origin.moveLeft	= moveX;

			console.log(this.origin)
		}
	}

	// Possible performance bottleneck on many markers
	public closePopup(): void {
		for (let i = 0; i < this.markers.length; i++) {
			const marker = this.markers[i];
			marker.closePopup();
		}
	}

	// Window Event Handlers
	private onWindowScroll() {
		// Update container origin
		if (this.container) {
			const containerRect	= this.container.getBoundingClientRect();
			this.origin.top 	= containerRect.top;
			this.origin.left	= containerRect.left;
		}
	}

}