/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEFAULT_ID\": () => (/* binding */ DEFAULT_ID),\n/* harmony export */   \"Loader\": () => (/* binding */ Loader),\n/* harmony export */   \"LoaderStatus\": () => (/* binding */ LoaderStatus)\n/* harmony export */ });\n// do not edit .js files directly - edit src/index.jst\n\n\n\nvar fastDeepEqual = function equal(a, b) {\n  if (a === b) return true;\n\n  if (a && b && typeof a == 'object' && typeof b == 'object') {\n    if (a.constructor !== b.constructor) return false;\n\n    var length, i, keys;\n    if (Array.isArray(a)) {\n      length = a.length;\n      if (length != b.length) return false;\n      for (i = length; i-- !== 0;)\n        if (!equal(a[i], b[i])) return false;\n      return true;\n    }\n\n\n\n    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;\n    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();\n    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();\n\n    keys = Object.keys(a);\n    length = keys.length;\n    if (length !== Object.keys(b).length) return false;\n\n    for (i = length; i-- !== 0;)\n      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;\n\n    for (i = length; i-- !== 0;) {\n      var key = keys[i];\n\n      if (!equal(a[key], b[key])) return false;\n    }\n\n    return true;\n  }\n\n  // true if both NaN, false otherwise\n  return a!==a && b!==b;\n};\n\n/**\n * Copyright 2019 Google LLC. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at.\n *\n *      Http://www.apache.org/licenses/LICENSE-2.0.\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nconst DEFAULT_ID = \"__googleMapsScriptId\";\n/**\n * The status of the [[Loader]].\n */\nvar LoaderStatus;\n(function (LoaderStatus) {\n    LoaderStatus[LoaderStatus[\"INITIALIZED\"] = 0] = \"INITIALIZED\";\n    LoaderStatus[LoaderStatus[\"LOADING\"] = 1] = \"LOADING\";\n    LoaderStatus[LoaderStatus[\"SUCCESS\"] = 2] = \"SUCCESS\";\n    LoaderStatus[LoaderStatus[\"FAILURE\"] = 3] = \"FAILURE\";\n})(LoaderStatus || (LoaderStatus = {}));\n/**\n * [[Loader]] makes it easier to add Google Maps JavaScript API to your application\n * dynamically using\n * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).\n * It works by dynamically creating and appending a script node to the the\n * document head and wrapping the callback function so as to return a promise.\n *\n * ```\n * const loader = new Loader({\n *   apiKey: \"\",\n *   version: \"weekly\",\n *   libraries: [\"places\"]\n * });\n *\n * loader.load().then((google) => {\n *   const map = new google.maps.Map(...)\n * })\n * ```\n */\nclass Loader {\n    /**\n     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set\n     * using this library, instead the defaults are set by the Google Maps\n     * JavaScript API server.\n     *\n     * ```\n     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});\n     * ```\n     */\n    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = \"https://maps.googleapis.com/maps/api/js\", version, }) {\n        this.CALLBACK = \"__googleMapsCallback\";\n        this.callbacks = [];\n        this.done = false;\n        this.loading = false;\n        this.errors = [];\n        this.apiKey = apiKey;\n        this.authReferrerPolicy = authReferrerPolicy;\n        this.channel = channel;\n        this.client = client;\n        this.id = id || DEFAULT_ID; // Do not allow empty string\n        this.language = language;\n        this.libraries = libraries;\n        this.mapIds = mapIds;\n        this.nonce = nonce;\n        this.region = region;\n        this.retries = retries;\n        this.url = url;\n        this.version = version;\n        if (Loader.instance) {\n            if (!fastDeepEqual(this.options, Loader.instance.options)) {\n                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);\n            }\n            return Loader.instance;\n        }\n        Loader.instance = this;\n    }\n    get options() {\n        return {\n            version: this.version,\n            apiKey: this.apiKey,\n            channel: this.channel,\n            client: this.client,\n            id: this.id,\n            libraries: this.libraries,\n            language: this.language,\n            region: this.region,\n            mapIds: this.mapIds,\n            nonce: this.nonce,\n            url: this.url,\n            authReferrerPolicy: this.authReferrerPolicy,\n        };\n    }\n    get status() {\n        if (this.errors.length) {\n            return LoaderStatus.FAILURE;\n        }\n        if (this.done) {\n            return LoaderStatus.SUCCESS;\n        }\n        if (this.loading) {\n            return LoaderStatus.LOADING;\n        }\n        return LoaderStatus.INITIALIZED;\n    }\n    get failed() {\n        return this.done && !this.loading && this.errors.length >= this.retries + 1;\n    }\n    /**\n     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].\n     *\n     * @ignore\n     */\n    createUrl() {\n        let url = this.url;\n        url += `?callback=${this.CALLBACK}`;\n        if (this.apiKey) {\n            url += `&key=${this.apiKey}`;\n        }\n        if (this.channel) {\n            url += `&channel=${this.channel}`;\n        }\n        if (this.client) {\n            url += `&client=${this.client}`;\n        }\n        if (this.libraries.length > 0) {\n            url += `&libraries=${this.libraries.join(\",\")}`;\n        }\n        if (this.language) {\n            url += `&language=${this.language}`;\n        }\n        if (this.region) {\n            url += `&region=${this.region}`;\n        }\n        if (this.version) {\n            url += `&v=${this.version}`;\n        }\n        if (this.mapIds) {\n            url += `&map_ids=${this.mapIds.join(\",\")}`;\n        }\n        if (this.authReferrerPolicy) {\n            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;\n        }\n        return url;\n    }\n    deleteScript() {\n        const script = document.getElementById(this.id);\n        if (script) {\n            script.remove();\n        }\n    }\n    /**\n     * Load the Google Maps JavaScript API script and return a Promise.\n     */\n    load() {\n        return this.loadPromise();\n    }\n    /**\n     * Load the Google Maps JavaScript API script and return a Promise.\n     *\n     * @ignore\n     */\n    loadPromise() {\n        return new Promise((resolve, reject) => {\n            this.loadCallback((err) => {\n                if (!err) {\n                    resolve(window.google);\n                }\n                else {\n                    reject(err.error);\n                }\n            });\n        });\n    }\n    /**\n     * Load the Google Maps JavaScript API script with a callback.\n     */\n    loadCallback(fn) {\n        this.callbacks.push(fn);\n        this.execute();\n    }\n    /**\n     * Set the script on document.\n     */\n    setScript() {\n        if (document.getElementById(this.id)) {\n            // TODO wrap onerror callback for cases where the script was loaded elsewhere\n            this.callback();\n            return;\n        }\n        const url = this.createUrl();\n        const script = document.createElement(\"script\");\n        script.id = this.id;\n        script.type = \"text/javascript\";\n        script.src = url;\n        script.onerror = this.loadErrorCallback.bind(this);\n        script.defer = true;\n        script.async = true;\n        if (this.nonce) {\n            script.nonce = this.nonce;\n        }\n        document.head.appendChild(script);\n    }\n    /**\n     * Reset the loader state.\n     */\n    reset() {\n        this.deleteScript();\n        this.done = false;\n        this.loading = false;\n        this.errors = [];\n        this.onerrorEvent = null;\n    }\n    resetIfRetryingFailed() {\n        if (this.failed) {\n            this.reset();\n        }\n    }\n    loadErrorCallback(e) {\n        this.errors.push(e);\n        if (this.errors.length <= this.retries) {\n            const delay = this.errors.length * Math.pow(2, this.errors.length);\n            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);\n            setTimeout(() => {\n                this.deleteScript();\n                this.setScript();\n            }, delay);\n        }\n        else {\n            this.onerrorEvent = e;\n            this.callback();\n        }\n    }\n    setCallback() {\n        window.__googleMapsCallback = this.callback.bind(this);\n    }\n    callback() {\n        this.done = true;\n        this.loading = false;\n        this.callbacks.forEach((cb) => {\n            cb(this.onerrorEvent);\n        });\n        this.callbacks = [];\n    }\n    execute() {\n        this.resetIfRetryingFailed();\n        if (this.done) {\n            this.callback();\n        }\n        else {\n            // short circuit and warn if google.maps is already loaded\n            if (window.google && window.google.maps && window.google.maps.version) {\n                console.warn(\"Google Maps already loaded outside @googlemaps/js-api-loader.\" +\n                    \"This may result in undesirable behavior as options and script parameters may not match.\");\n                this.callback();\n                return;\n            }\n            if (this.loading) ;\n            else {\n                this.loading = true;\n                this.setCallback();\n                this.setScript();\n            }\n        }\n    }\n}\n\n\n//# sourceMappingURL=index.esm.js.map\n\n\n//# sourceURL=webpack:///../node_modules/@googlemaps/js-api-loader/dist/index.esm.js?");

/***/ }),

/***/ "./Mappy.ts":
/*!******************!*\
  !*** ./Mappy.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nexports.__esModule = true;\nvar MappyConfig_1 = __webpack_require__(/*! ./MappyConfig */ \"./MappyConfig.ts\");\nvar js_api_loader_1 = __webpack_require__(/*! @googlemaps/js-api-loader */ \"../node_modules/@googlemaps/js-api-loader/dist/index.esm.js\");\nvar MappyMarker_1 = __importDefault(__webpack_require__(/*! ./MappyMarker */ \"./MappyMarker.ts\"));\nvar MappyMarkerConfig_1 = __webpack_require__(/*! ./MappyMarkerConfig */ \"./MappyMarkerConfig.ts\");\nvar Mappy = /** @class */ (function () {\n    // Create new map instance\n    function Mappy(id, config) {\n        if (config === void 0) { config = MappyConfig_1.MappyConfigDefault; }\n        var _this = this;\n        this.markers = [];\n        this.activePopups = [];\n        this.refPoint = { x: 0, y: 0, moveX: 0, moveY: 0 };\n        this.refPointInitialized = false;\n        this.origin = { top: 0, left: 0, scrollTop: 0, scrollLeft: 0, moveTop: 0, moveLeft: 0, initScrollTop: 0, initScrollLeft: 0 };\n        if (!Mappy.initialized) {\n            console.error(\"Mappy is not initialized. Run Mappy.init() first.\");\n            return;\n        }\n        var _config = __assign(__assign({}, MappyConfig_1.MappyConfigDefault), config);\n        var container = document.getElementById(id);\n        if (!container) {\n            console.error(\"Element with id \".concat(id, \" doesn't exist.\"));\n            return;\n        }\n        if (_config.onClick)\n            this.onClick = _config.onClick;\n        if (_config.onMove)\n            this.onMove = _config.onMove;\n        // – Origin\n        var containerRect = container.getBoundingClientRect();\n        this.origin.top = containerRect.top;\n        this.origin.left = containerRect.left;\n        this.origin.initScrollTop = window.scrollY;\n        this.origin.initScrollLeft = window.scrollX;\n        // Container\n        this.container = container;\n        this.container.style.position = \"relative\";\n        this.container.style.overflow = \"hidden\";\n        // Add map element\n        var mapElement = document.createElement(\"div\");\n        mapElement.classList.add(\"map\");\n        mapElement.style.width = \"100%\";\n        mapElement.style.height = \"100%\";\n        this.container.appendChild(mapElement);\n        this.map = new google.maps.Map(mapElement, {\n            // Override default settings\n            disableDefaultUI: true,\n            // Map settings\n            center: { lat: _config.lat, lng: _config.lng },\n            zoom: _config.zoom\n        });\n        // Reference marker\n        var refMarker = new google.maps.Marker({\n            position: this.map.getCenter(),\n            icon: {\n                url: \"\",\n                size: new google.maps.Size(0, 0)\n            }\n        });\n        refMarker.setMap(this.map);\n        // Event listeners\n        // - First time loaded\n        this.map.addListener(\"tilesloaded\", function () { _this.onLoad(); });\n        // - Maps moved\n        this.map.addListener(\"center_changed\", function () { _this.handleOnMove(); });\n        // - Maps clicked\n        this.map.addListener(\"click\", function () { _this.handleOnClick(); });\n        // - Window Events\n        window.addEventListener(\"resize\", function () { _this.closePopup(); });\n        window.addEventListener(\"scroll\", function () { _this.onWindowScroll(); });\n        Mappy.instances.push(this);\n    }\n    // Library initialization\n    Mappy.init = function (apiKey, callback) {\n        var _this = this;\n        this.apiKey = apiKey;\n        // Load Google Maps script\n        var loader = new js_api_loader_1.Loader({\n            apiKey: this.apiKey,\n            version: \"weekly\"\n        });\n        loader.load().then(function () {\n            _this.initialized = true;\n            if (callback)\n                callback();\n        });\n    };\n    // Add a marker to map\n    Mappy.prototype.addMarker = function (config) {\n        if (config === void 0) { config = MappyMarkerConfig_1.MappyMarkerConfigDefault; }\n        var _config = __assign(__assign({}, MappyMarkerConfig_1.MappyMarkerConfigDefault), config);\n        var marker = new MappyMarker_1[\"default\"](this, _config);\n        this.markers.push(marker);\n    };\n    // Add element to container\n    Mappy.prototype.addElement = function (element) {\n        var _a;\n        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(element);\n    };\n    Mappy.prototype.onLoad = function () {\n        var _a;\n        if (!this.refPointInitialized) {\n            var ref = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector(\"img\");\n            if (ref) {\n                var rect = ref.getBoundingClientRect();\n                this.refPoint.x = rect.x;\n                this.refPoint.y = rect.y;\n                this.refPointInitialized = true;\n            }\n        }\n    };\n    Mappy.prototype.handleOnMove = function () {\n        this.updateRefPoint();\n        if (this.onMove)\n            this.onMove();\n    };\n    Mappy.prototype.handleOnClick = function () {\n        this.closePopup();\n        if (this.onClick)\n            this.onClick();\n    };\n    Mappy.prototype.updateRefPoint = function () {\n        var _a;\n        var ref = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector(\"img\");\n        if (ref) {\n            var rect = ref.getBoundingClientRect();\n            var moveX = rect.x - this.refPoint.x;\n            var moveY = rect.y - this.refPoint.y;\n            this.refPoint.moveX = moveX;\n            this.refPoint.moveY = moveY;\n            this.origin.moveTop = moveY;\n            this.origin.moveLeft = moveX;\n        }\n    };\n    // Possible performance bottleneck on many markers\n    Mappy.prototype.closePopup = function () {\n        for (var i = 0; i < this.markers.length; i++) {\n            var marker = this.markers[i];\n            marker.closePopup();\n        }\n    };\n    // Window Event Handlers\n    Mappy.prototype.onWindowScroll = function () {\n        // Update container origin\n        if (this.container) {\n            var containerRect = this.container.getBoundingClientRect();\n            this.origin.scrollTop = window.scrollY - this.origin.initScrollTop;\n            this.origin.scrollLeft = window.scrollX - this.origin.initScrollLeft;\n            this.origin.top = containerRect.top;\n            this.origin.left = containerRect.left;\n        }\n    };\n    Mappy.initialized = false;\n    Mappy.apiKey = \"\";\n    Mappy.instances = [];\n    return Mappy;\n}());\nexports[\"default\"] = Mappy;\n\n\n//# sourceURL=webpack:///./Mappy.ts?");

/***/ }),

/***/ "./MappyConfig.ts":
/*!************************!*\
  !*** ./MappyConfig.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.MappyConfigDefault = void 0;\nexports.MappyConfigDefault = {\n    lat: -0.6058936613783388,\n    lng: 114.22502294088073,\n    zoom: 5\n};\n\n\n//# sourceURL=webpack:///./MappyConfig.ts?");

/***/ }),

/***/ "./MappyMarker.ts":
/*!************************!*\
  !*** ./MappyMarker.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nvar MappyMarker = /** @class */ (function () {\n    function MappyMarker(context, config) {\n        var _this = this;\n        this.popupHidden = true;\n        var _config = {\n            position: { lat: config.lat, lng: config.lng },\n            map: context.map\n        };\n        this.context = context;\n        this.position = _config.position;\n        // Marker Icon\n        if (config.icon) {\n            _config.icon = {\n                url: config.icon.url,\n                scaledSize: config.icon.width && config.icon.height ? new google.maps.Size(config.icon.width, config.icon.height) : undefined\n            };\n        }\n        // Popup\n        if (config.popup) {\n            this.popupElement = document.createElement(\"div\");\n            this.popupElement.appendChild(config.popup);\n            this.popupElement.style.position = \"absolute\";\n            this.popupElement.style.top = \"-100%\";\n            this.popupElement.style.left = \"-100%\";\n            this.popupElement.style.opacity = \"0\";\n            this.context.addElement(this.popupElement);\n            this.popupInnerElement = config.popup;\n            this.context.map.addListener(\"center_changed\", function () { _this.update(); });\n        }\n        this.marker = new google.maps.Marker(_config);\n        // Events\n        this.onClick = config.onClick;\n        this.marker.addListener(\"click\", function (e) { _this.clickHandler(e); });\n    }\n    MappyMarker.prototype.clickHandler = function (e) {\n        var markerRect = e.domEvent.target.getBoundingClientRect();\n        var rect = this.popupElement.getBoundingClientRect();\n        var top = markerRect.top - rect.height + this.context.origin.scrollTop;\n        var left = markerRect.left + (markerRect.width * 0.5) - (rect.width * 0.5) + this.context.origin.scrollLeft;\n        var initMoveTop = this.context.origin.moveTop;\n        var initMoveLeft = this.context.origin.moveLeft;\n        var origin = { top: top, left: left, initMoveTop: initMoveTop, initMoveLeft: initMoveLeft };\n        this.origin = origin;\n        this.update();\n        this.context.closePopup();\n        this.openPopup();\n        if (this.onClick)\n            this.onClick(this);\n    };\n    MappyMarker.prototype.openPopup = function () {\n        this.popupHidden = false;\n        this.update();\n        if (this.popupElement) {\n            this.popupElement.style.opacity = \"1\";\n        }\n    };\n    MappyMarker.prototype.closePopup = function () {\n        if (this.popupElement) {\n            this.popupElement.style.opacity = \"0\";\n            this.popupElement.style.top = \"-100%\";\n            this.popupElement.style.left = \"-100%\";\n            this.popupHidden = true;\n        }\n    };\n    MappyMarker.prototype.update = function () {\n        if (this.popupElement && this.origin) {\n            var top_1 = this.origin.top - this.origin.initMoveTop + this.context.origin.moveTop - this.context.origin.top - this.context.origin.scrollTop;\n            var left = this.origin.left - this.origin.initMoveLeft + this.context.origin.moveLeft - this.context.origin.left - this.context.origin.scrollLeft;\n            if (!this.popupHidden) {\n                this.popupElement.style.top = top_1 + \"px\";\n                this.popupElement.style.left = left + \"px\";\n            }\n        }\n    };\n    return MappyMarker;\n}());\nexports[\"default\"] = MappyMarker;\n\n\n//# sourceURL=webpack:///./MappyMarker.ts?");

/***/ }),

/***/ "./MappyMarkerConfig.ts":
/*!******************************!*\
  !*** ./MappyMarkerConfig.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.MappyMarkerConfigDefault = void 0;\nexports.MappyMarkerConfigDefault = {\n    lat: -0.6058936613783388,\n    lng: 114.22502294088073\n};\n\n\n//# sourceURL=webpack:///./MappyMarkerConfig.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nexports.__esModule = true;\nvar Mappy_1 = __importDefault(__webpack_require__(/*! ./Mappy */ \"./Mappy.ts\"));\n// If in browser environment,\n// assign Mappy class to window\nif (typeof window !== \"undefined\") {\n    // @ts-ignore\n    window.Mappy = Mappy_1[\"default\"];\n}\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;