"use strict";

import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import { setToLocalStorage } from "./utils/setToLocalStorage.js";

const list = document.querySelector(".list"); //Получили нумерованный список, куда мы будем размещать комментарии

let publishedComments = []; //Инициализировали пустой массив для хранения комментариев

document.addEventListener("DOMContentLoaded", () => {
	publishedComments =
		JSON.parse(getFromLocalStorage("publishedComments")) ?? [];
	initComments(publishedComments);
});

//Функция создания элемента разметки
function createEl(name, date, comment, id) {
	const item = document.createElement("li"); //создаем элемент li
	item.className = "list__item"; // добавляем элементу ккласс
	item.dataset.id = id; //добавляем элементу id
	//Добавляем в элемент разметку(используем бэктики), значения потом возьмем из созданного объекта
	item.innerHTML = `<div class="item-wrap">
  <div class="item__title">
    <p>${name}</p>
    <p>${comment}</p>
  </div>
    <div class="item__content">
    <p>${date}</p>
    <div class="buttonContainer">
    <button class="btn_like"><svg class="btn-like__icon" width="26" height="18" viewBox="0 0 44 35" fill="#888888" xmlns="http://www.w3.org/2000/svg" aria-label="Добавить в избранное">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.30841 2.95447C7.29791 -0.875449 13.7444 -0.875449 17.7339 2.95447L22.0002 7.05027L26.2667 2.95447C30.2563 -0.875449 36.7027 -0.875449 40.6923 2.95447C44.6817 6.78439 44.6817 12.973 40.6923 16.803L22.0002 34.7472L3.30841 16.803C-0.681091 12.973 -0.681091 6.78439 3.30841 2.95447ZM14.7876 5.78289C12.4253 3.51507 8.61701 3.51507 6.25468 5.78289C3.89237 8.05071 3.89237 11.7067 6.25468 13.9746L22.0002 29.0904L37.7461 13.9746C40.1084 11.7067 40.1084 8.05071 37.7461 5.78289C35.3838 3.51507 31.5755 3.51507 29.2132 5.78289L22.0002 12.7072L14.7876 5.78289Z"></path>
  </svg></button>
  <button class="btn_delete"><img class="img-delete" src="./src/trashcan.svg"/></button>
    </div>
    </div>
  </div>`;
	const btnDelete = item.querySelector(".btn_delete"); //Создаем кнопку удаления комментария из списка
	btnDelete.addEventListener("click", (event) => {
		deleteElFromList(event.currentTarget.closest(".list__item"));
	}); //Навешиваем обработчик собтий на кнопку удаления, передаем функцию deleteEl

	return item; //функция createEl возвращает элемент
}

// 1 Функия создания разметки списка комментариев срабатывает при загрузке страницы
function initComments(arr) {
	//мапим массив Comments по элементам и для каждого элемента вызываем функцию создать элемент
	const commentsElements = arr.map((comment) => {
		return createEl(comment.name, comment.date, comment.comment, comment.id);
	});
	if (list.hasChildNodes()) {
		list.innerHTML = "";
	}
	list.append(...commentsElements); //добавлем внуть элемента лист наш массив с ипользованием спредоператора
}

// 3 Функция, срабатывающая при нажатии на кнопку "опубликовать комментарий"

function saveComment(name, date, comment) {
	const commentEl = createComment(name, date, comment); //Создаем константу, в нее присваиваем и вызываем функцию создания комментария(вернет объект)
	publishedComments.push(commentEl); //пушим в массив наш объект с комментарием
	setToLocalStorage("publishedComments", publishedComments); //Вызываем функцию, которая сохранит наш массив в локал сторедж
	list.append(
		createEl(commentEl.name, commentEl.date, commentEl.comment, commentEl.id)
	); //добавляем в элемент лист(список комментариев), вызывая функцию создать элемент(разметку элемента)
}

// 4 Создаем объект, который запишем в массив как элемент списка
function createComment(name, date, comment) {
	return {
		name,
		date,
		comment,
		id: Date.now(), //уникальный id
	};
}

// 5 Записываем в локал сторэдж

//8 Фуункция удалить элемент из списка комментариев, вызывается в ф-и createEl

function deleteElFromList(delEl) {
	const elId = delEl.dataset.id;
	publishedComments = publishedComments.filter((el) => el.id != elId);
	setToLocalStorage("publishedComments", publishedComments);
	delEl.remove();
}

export { saveComment };
