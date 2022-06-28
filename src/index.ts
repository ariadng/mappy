import Mappy from "./Mappy";

// If in browser environment,
// assign Mappy class to window
if (typeof window !== "undefined") {
	// @ts-ignore
	window.Mappy = Mappy;
}