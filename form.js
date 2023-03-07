"use strict";

import { saveComment } from "./comments.js";
import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import { saveToLocalStorage } from "./utils/saveToLocalStorage.js";

const form = document.querySelector(".feedback-form");
const formInputs = form.querySelectorAll("input");

const inputUserName = form["username"];
const inputDate = form["date"]; //Инпут с датой
const textArea = form["review"];

const EMPTY_INPUT_USER_NAME_ERROR = "Вы забыли указать имя";
const LENGTH_INPUT_USER_NAME_ERROR = "Имя не может быть короче 2-х символов";

const getInputName = (elem) => elem.getAttribute("name");

document.addEventListener("DOMContentLoaded", () => {
	inputUserName.value = getFromLocalStorage(getInputName(inputUserName)) ?? "";
	inputDate.value = getFromLocalStorage(getInputName(inputDate)) ?? "";
	textArea.value = getFromLocalStorage(getInputName(textArea)) ?? "";
});

function addErrorClass(input) {
	input.classList.add("error");
}

function removeErrorClass(input) {
	input.addEventListener("focus", () => {
		input.classList.remove("error");
	});
}

formInputs.forEach((input) => {
	removeErrorClass(input);
	saveToLocalStorage(input);
});

saveToLocalStorage(textArea);

form.onsubmit = function (event) {
	event.preventDefault();
	const inputUserNameValue = inputUserName.value.trim();

	let text = "";
	if (inputUserNameValue === "" || inputUserNameValue.length <= 2) {
		addErrorClass(inputUserName);
		text =
			inputUserNameValue === ""
				? EMPTY_INPUT_USER_NAME_ERROR
				: LENGTH_INPUT_USER_NAME_ERROR;
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
};
