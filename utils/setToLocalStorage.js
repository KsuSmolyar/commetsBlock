"use strict";

/**
 * Сохраняет массив в LocalStorage
 * @param {String} key
 * @param {Comment[]} arr
 */
export function setToLocalStorage(key, arr) {
	localStorage.setItem(key, JSON.stringify(arr));
}
