"use strict";

/**
 * Форматирует дату
 * @param {String} date
 * @returns {String} отформатированная дата
 */
export function dateFormater(date) {
	const dateNow = new Date();
	const dateComment = new Date(date);
	const sameMonth = isSameMonth(dateNow, dateComment);
	const sameYear = isSameYear(dateNow, dateComment);

	const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });
	const time = new Intl.DateTimeFormat("ru", {
		hour: "numeric",
		minute: "numeric",
	});
	const fullDate = new Intl.DateTimeFormat("ru", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	const diffDays = dateComment.getDate() - dateNow.getDate();

	if (sameYear && sameMonth && (diffDays == 0 || diffDays == -1)) {
		return `${rtf.format(diffDays, "day")}, ${time.format(dateComment)}`;
	}

	return fullDate.format(dateComment);
}

function isSameMonth(a, b) {
	return a.getMonth() === b.getMonth();
}

function isSameYear(a, b) {
	return a.getFullYear() === b.getFullYear();
}
