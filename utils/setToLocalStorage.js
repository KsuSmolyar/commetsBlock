"use strict";

export function setToLocalStorage(key, arr) {
	localStorage.setItem(key, JSON.stringify(arr)); //По колючу comment записываем массив, преобразованный в джейсон формат
}
