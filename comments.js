"use strict";

import { dateFormater } from "./utils/dateFormater.js";
import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import { setToLocalStorage } from "./utils/setToLocalStorage.js";

const list = document.querySelector(".list");

/**
 * @typedef {Object} Comment
 * @property {String} name
 * @property {String} date
 * @property {String} comment
 * @property {Number} id
 * @property {Boolean} liked
 */

/**
 * @type {Comment[]}
 */
let publishedComments = [];

/**
 *Создает элемент разметки HTML
 * @param {Comment} объект комментария
 * @returns {Node} элемент разметки HTML
 */

function createEl({ name, date, comment, id, liked }) {
	const item = document.createElement("li");
	item.className = "list__item";
	item.dataset.id = id;
	item.innerHTML = `
	<div class="item-wrap">
  	<div class="item__title">
			<p class="titleName">${name}</p>
			<p class="titleComment">${comment}</p>
  	</div>
    <div class="item__content">
    	<p class="itemDate">${dateFormater(date)}</p>
   	 	<div class="buttonContainer">
				<button class="btn_like">
					<svg class="btn-like__icon ${
						liked ? "liked" : ""
					}" width="26" height="18" viewBox="0 0 44 35" fill="#888888" xmlns="http://www.w3.org/2000/svg" aria-label="Добавить в избранное">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M3.30841 2.95447C7.29791 -0.875449 13.7444 -0.875449 17.7339 2.95447L22.0002 7.05027L26.2667 2.95447C30.2563 -0.875449 36.7027 -0.875449 40.6923 2.95447C44.6817 6.78439 44.6817 12.973 40.6923 16.803L22.0002 34.7472L3.30841 16.803C-0.681091 12.973 -0.681091 6.78439 3.30841 2.95447ZM14.7876 5.78289C12.4253 3.51507 8.61701 3.51507 6.25468 5.78289C3.89237 8.05071 3.89237 11.7067 6.25468 13.9746L22.0002 29.0904L37.7461 13.9746C40.1084 11.7067 40.1084 8.05071 37.7461 5.78289C35.3838 3.51507 31.5755 3.51507 29.2132 5.78289L22.0002 12.7072L14.7876 5.78289Z"></path>
					</svg>
				</button>
 				<button class="btn_delete">
					<img class="img-delete" src="./src/trashcan.svg"/>
				</button>
    	</div>
    </div>
  </div>`;
	const btnDelete = item.querySelector(".btn_delete");
	btnDelete.addEventListener("click", (event) => {
		deleteElFromList(event.currentTarget.closest(".list__item"));
	});

	const btnLike = item.querySelector(".btn_like");
	const btnLikeIcon = btnLike.querySelector(".btn-like__icon");

	btnLike.addEventListener("click", (event) => {
		const elem = event.currentTarget.closest(".list__item");
		if (btnLikeIcon.classList.contains("liked")) {
			btnLikeIcon.classList.remove("liked");
			changeLike(elem, false);
		} else {
			btnLikeIcon.classList.add("liked");
			changeLike(elem, true);
		}
	});
	return item;
}

/**
 *Добавляет объект комментария в массив, сохраняет изменения в LocalStorage
 * @param {String} name значение "имя" для сохранения в объекте
 * @param {String} date значение "дата" для сохранения в объекте
 * @param {String} comment значение "комментарий" для сохранения в объекте
 */

export function saveComment(name, date, comment) {
	const savedDate = new Date(date ? date : Date.now());

	if (date) {
		const currentDate = new Date();
		savedDate.setHours(currentDate.getHours());
		savedDate.setMinutes(currentDate.getMinutes());
	}

	const commentObj = createComment(name, savedDate, comment);
	publishedComments.push(commentObj);
	setToLocalStorage("publishedComments", publishedComments);
	const commentEl = createEl(commentObj);
	list.append(commentEl);
	commentEl.scrollIntoView();
}

/**
 * Создает объект комментария
 * @param {String} name значение по ключу "name"
 * @param {Date} date значение по ключу "date"
 * @param {String} comment значение по ключу "comment"
 * @returns {Comment} объект комментария
 */

function createComment(name, date, comment) {
	return {
		name,
		date,
		comment,
		id: Date.now(),
		liked: false,
	};
}

/**
 * Удаляет элемент из списка, сохраняет изменения в LocalStorage
 * @param {Node} delEl элемент разметки HTML, который удаляется
 */

function deleteElFromList(delEl) {
	const elId = delEl.dataset.id;
	publishedComments = publishedComments.filter((el) => el.id != elId);
	setToLocalStorage("publishedComments", publishedComments);
	delEl.remove();
}

/**
 * Меняет состояние элемента, сохраняет изменение состояния в LocalStorage
 * @param {Node} el элемент, которому необходимо изменить состояние
 * @param {Boolean} like состояние
 */
function changeLike(el, like) {
	const elId = el.dataset.id;
	const comment = publishedComments.find((item) => item.id == elId);
	comment.liked = like;
	setToLocalStorage("publishedComments", publishedComments);
}

/**
 * Инициализирует комментарий
 */

export function initComments() {
	publishedComments =
		JSON.parse(getFromLocalStorage("publishedComments")) ?? [];
	const commentsElements = publishedComments.map((comment) => {
		return createEl(comment);
	});
	if (list.hasChildNodes()) {
		list.innerHTML = "";
	}
	list.append(...commentsElements);
}
