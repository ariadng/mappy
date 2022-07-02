
![mappy](https://user-images.githubusercontent.com/57926750/177007121-720b303b-83ba-4305-b9a5-5b90859d2641.svg)

Mappy is a JavaScript library to make working with Google Maps API easier.

- Getting Started
- Configuration
- Markers

## Getting Started

Create an element with a specific id (e.g. `#map`) to be the container of the map.

```html
<div id="map"></div>
```

The map will fill the entire container. It's required to specify the width and height of the container beforehand using CSS or inline styling.

```css
#map {
  width: 100vw; // width is 100% of viewport
  height: 75vh; // height is 75% of viewport
}
```

Load `mappy.min.js` file to your page using the `<script>` tag:

```html
<script src="path/to/mappy.min.js"></script>
```

Then, create a script to initialize and configure Mappy using the Google Maps API Key. If you don't have one, [read this page](https://developers.google.com/maps/documentation/javascript/get-api-key).

```javascript
<script type="text/javascript">

  Mappy.init("yourApiKey", () => {
    
    // Create a new map instance
    let map = new Mappy("#map");
    
  });

</script>
```
You can have multiple maps inside a page. `Mappy.init` function ensures that you'll have Google Maps API fully loaded so you can add and configure maps inside the callback function.

## Configuration

The constructor function accepts two parameters: `id` of the map container element and a `config` object. For example, to make Bali the center of the map with `9` zoom level:

```javascript
let map = new Mappy("map", {
  lat: -8.348814088804275,
  lng: 115.15959826040515,
  zoom: 9
});
```

Available configurations:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| lat | number | -0.6058936613783388 | Latitude of map's center coordinate |
| lng | number | 114.22502294088073 | Longitude of map's center coordinate |
| zoom | number | 5 | Initial zoom level |
| onClick | Function | - | A function to run when the map is clicked |
| onZoom | Function | - | A function to run when the zoom level is changed |
| onMove | Function | - | A function to run when the map is moved (e.g. by dragging) |

## Markers

To add markers, you can use `addMarker` function on a specific map. For example, we will add marker of Nusa Dua beach on our map:

```javascript
// Create the map
let map = new Mappy("map", {
  lat: -8.348814088804275,
  lng: 115.15959826040515,
  zoom: 9
});

// Add marker to the map
map.addMarker({
  lat: -8.795659225012042,
  lng: 115.23259774558099
);
```

The `addMarker` function accepts one `config` object. Here is the available list of object parameters:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| **lat** | number | - | Latitude of marker's coordinate |
| **lng** | number | - | Longitude of marker's coordinate |
| icon | {url: string, width: number, height: number} | - | Custom marker icon |
| popup | HTMLElement | - | Popup element to be shown when the marker is clicked |
| onClick | Function | - | A function to run when the marker is clicked |




