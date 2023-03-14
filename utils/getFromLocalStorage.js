"use strict";

/**
 * Получает значение из LocalStorage
 * @param {String} key
 * @returns {(String | null)}
 */
export function getFromLocalStorage(key) {
	return localStorage.getItem(key);
}
