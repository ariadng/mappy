import Mappy from "./Mappy";
import { MappyMarkerConfig } from "./MappyMarkerConfig";

export default class MappyMarker {

	private context?: Mappy;

	private marker?: google.maps.Marker;

	private onClick?: Function;

	public position? : { lat: number, lng: number };
	public origin?: { top: number, left: number, x: number, y: number };

	public popupElement?: HTMLElement;

	constructor (context: Mappy, config: MappyMarkerConfig) {
		let _config: any = {
			position: { lat: config.lat, lng: config.lng },
			map: context.map,
		};

		this.context = context;
		this.position = _config.position;

		// Marker Icon
		if (config.icon) {
			_config.icon = {
				url: config.icon.url,
				scaledSize: config.icon.width && config.icon.height ? new google.maps.Size(config.icon.width!, config.icon.height!) : undefined
			}
		}

		// Popup
		if (config.popup) {
			this.popupElement = document.createElement("div");
			this.popupElement.appendChild(config.popup);
			
			this.popupElement.style.position = "absolute";
			this.popupElement.style.top = "-100%";
			this.popupElement.style.left = "-100%";
			this.popupElement.style.opacity = "0";

			this.context.addElement(this.popupElement);
			this.context.map!.addListener("center_changed", () => { this.update(); })
		}

		this.marker = new google.maps.Marker(_config);

		// Events
		this.onClick = config.onClick;
		this.marker.addListener("click", (e: any) => { this.clickHandler(e); });


	}

	private clickHandler(e: any): void {
		const rect 	= e.domEvent.target.getBoundingClientRect();
		const x		= rect.left + (rect.width * 0.5) - this.context!.refPoint.moveX;
		const y 	= rect.top - this.context!.refPoint.moveY;
		
		const origin = { x, y, top: rect.top, left: rect.left };
		if (!this.origin) {
			this.origin = origin;
		}

		this.context!.closePopup();
		this.openPopup();
		
		if (this.onClick) this.onClick(this);
	}

	public openPopup(): void {
		this.update();
		if (this.popupElement) {
			this.popupElement.style.opacity = "1";
		}
	}

	public closePopup(): void {
		if (this.popupElement) {
			this.popupElement.style.opacity = "0";
			this.popupElement.style.top = "-100%";
			this.popupElement.style.left = "-100%";
		}
	}

	private update(): void {
		if (this.popupElement && this.origin) {
			const rect 	= this.popupElement.getBoundingClientRect();
			const left 	= this.origin.x - (rect.width * 0.5) + this.context!.refPoint.moveX;
			const top	= this.origin.y - (rect.height + 20) + this.context!.refPoint.moveY;
			this.popupElement.style.top	 = top + "px";
			this.popupElement.style.left = left + "px";
		}
	}

}