"use strict";

export function dateFormater(date) {
	let dateNow = new Date(Date.now());
	let dateComment = new Date(date);

	let diff = dateComment.getDay() - dateNow.getDay();

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

	if (diff == 0 || diff == -1) {
		return `${rtf.format(diff, "day")}, ${time.format(dateComment)}`;
	} else {
		return fullDate.format(dateComment);
	}
}
