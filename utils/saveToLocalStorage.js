"use strict";

export function saveToLocalStorage(input) {
	input.addEventListener("input", () => {
		localStorage.setItem(getInputName(input), input.value);
	});
}
