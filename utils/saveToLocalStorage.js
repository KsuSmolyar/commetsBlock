"use strict";

import { getInputName } from "./getInputName.js";

/**
 * Навешивает обработчик события "input", сохраняет input.value в LocalStorage
 * @param {Node} input
 */
export function saveToLocalStorage(input) {
	input.addEventListener("input", () => {
		localStorage.setItem(getInputName(input), input.value);
	});
}
