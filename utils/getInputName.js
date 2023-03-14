"use strict";

/**
 * Получает значение атрибута "name" элемента
 * @param {Node} elem
 * @returns {String} значение атрибута "name" элемента
 */

export const getInputName = (elem) => elem.getAttribute("name");
