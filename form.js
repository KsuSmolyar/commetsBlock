"use strict";

import { saveComment } from "./comments.js";
import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import { saveToLocalStorage } from "./utils/saveToLocalStorage.js";
import { getInputName } from "./utils/getInputName.js";

const form = document.querySelector(".feedback-form");
const formInputs = form.querySelectorAll(".findings__input");

const inputUserName = form["username"];
const inputDate = form["date"];
const textArea = form["review"];

const EMPTY_INPUT_USER_NAME_ERROR = "*Вы забыли указать имя";
const LENGTH_INPUT_USER_NAME_ERROR = "*Имя не может быть короче 2-х символов";
const EMPTY_TEXTAREA = "*Пожалуйста, введите текст комментария";

/**
 * Добавляет элементу класс "error"
 * @param {Node} input элемент, которому добавляется класс "error"
 */
function addErrorClass(input) {
	input.classList.add("error");
}

/**
 * Удаляет у элемнта класс "error"
 * @param {Node} input элемент, у которого удаляется класс "error"
 */
function removeErrorClass(input) {
	input.addEventListener("input", () => {
		input.classList.remove("error");
	});
}

/**
 *Валидация формы
 * @param {Object} event событие onSubmit
 */
function onSubmit(event) {
	event.preventDefault();
	const inputUserNameValue = inputUserName.value.trim();
	const textAreaValue = textArea.value.trim();

	let text = "";
	if (inputUserNameValue === "" || inputUserNameValue.length <= 2) {
		addErrorClass(inputUserName);
		text =
			inputUserNameValue === ""
				? EMPTY_INPUT_USER_NAME_ERROR
				: LENGTH_INPUT_USER_NAME_ERROR;
	}

	if (text == "" && textAreaValue === "") {
		addErrorClass(textArea);
		text = EMPTY_TEXTAREA;
	}

	if (text !== "") {
		form.querySelector(
			".findings__input.error ~ .findings__error"
		).textContent = text;
	} else {
		saveComment(inputUserName.value, inputDate.value, textArea.value);
		localStorage.removeItem(getInputName(inputUserName));
		localStorage.removeItem(getInputName(textArea));
		localStorage.removeItem(getInputName(inputDate));

		inputUserName.value = "";
		textArea.value = "";
		inputDate.value = "";
	}
}

/**
 * Инициализация формы
 */
export function initForm() {
	inputUserName.value = getFromLocalStorage(getInputName(inputUserName)) ?? "";
	inputDate.value = getFromLocalStorage(getInputName(inputDate)) ?? "";
	textArea.value = getFromLocalStorage(getInputName(textArea)) ?? "";
	formInputs.forEach((input) => {
		removeErrorClass(input);
		saveToLocalStorage(input);
	});
	form.addEventListener("submit", onSubmit);
	document.addEventListener("keydown", (event) => {
		if (event.code === "Enter" && !event.shiftKey) {
			onSubmit(event);
		}
	});
}
