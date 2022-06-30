import Mappy from "./Mappy";
import { MappyMarkerConfig } from "./MappyMarkerConfig";

export default class MappyMarker {

	private context: Mappy;

	private marker?: google.maps.Marker;

	private onClick?: Function;

	public position? : { lat: number, lng: number };
	public origin?: { top: number, left: number, initMoveTop: number, initMoveLeft: number };

	public popupElement?: HTMLElement;
	public popupInnerElement?: HTMLElement;
	public popupHidden = true;

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
			this.popupInnerElement = config.popup;
			this.context.map!.addListener("center_changed", () => { this.update(); })
		}

		this.marker = new google.maps.Marker(_config);

		// Events
		this.onClick = config.onClick;
		this.marker.addListener("click", (e: any) => { this.clickHandler(e); });


	}

	private clickHandler(e: any): void {
		
		const markerRect = e.domEvent.target.getBoundingClientRect();
		const rect = this.popupElement!.getBoundingClientRect();

		const top	= markerRect.top - rect.height + this.context.origin.scrollTop;
		const left	= markerRect.left + (markerRect.width * 0.5) - (rect.width * 0.5) + this.context.origin.scrollLeft;

		const initMoveTop = this.context.origin.moveTop;
		const initMoveLeft = this.context.origin.moveLeft;
		
		const origin = { top, left, initMoveTop, initMoveLeft };

		this.origin = origin;
		this.update();

		this.context!.closePopup();
		
		this.openPopup();
		if (this.onClick) this.onClick(this);

	}

	public openPopup(): void {
		this.popupHidden = false;
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
			this.popupHidden = true;
		}
	}

	private update(): void {
		if (this.popupElement && this.origin) {
			
			const top	= this.origin.top - this.origin.initMoveTop + this.context.origin.moveTop - this.context.origin.top - this.context.origin.scrollTop;
			const left 	= this.origin.left - this.origin.initMoveLeft + this.context.origin.moveLeft - this.context.origin.left - this.context.origin.scrollLeft;
			
			if (!this.popupHidden) {
				this.popupElement.style.top = top + "px";
				this.popupElement.style.left = left + "px";
			}
		}
	}

}