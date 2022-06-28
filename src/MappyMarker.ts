import { MappyMarkerConfig } from "./MappyMarkerConfig";

export default class MappyMarker {

	private marker?: google.maps.Marker;
	private icon?: string;

	constructor (map: google.maps.Map, config: MappyMarkerConfig) {
		let _config = {
			position: { lat: config.lat, lng: config.lng },
			map: map
		};
		if (config.icon) {
			// @ts-ignore
			_config.icon = {
				url: config.icon.url,
				scaledSize: config.icon.width && config.icon.height ? new google.maps.Size(config.icon.width!, config.icon.height!) : undefined
			}
		}
		this.marker = new google.maps.Marker(_config);
	}

}