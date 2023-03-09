"use strict";

export const getInputName = (elem) => elem.getAttribute("name");
export function saveToLocalStorage(input) {
	input.addEventListener("input", () => {
		localStorage.setItem(getInputName(input), input.value);
	});
}
