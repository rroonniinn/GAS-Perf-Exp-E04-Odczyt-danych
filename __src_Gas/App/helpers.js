/* eslint-disable max-params */
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';

import { EXP_TITLE, EXP_METHOD, PRINT_TO, HUB } from './config';

/**
 * @typedef {import('./config').ExperimentSheet} ExperimentSheet
 * @typedef {import('./tasks').ExperimentTasks} ExperimentTasks
 */

// /**
//  * Wkleja tablicę z czasami do wskazanego arkusza
//  * @param {string} sheet
//  * @param {string} [id]
//  */

// const printTimes = (sheet, id) => () =>
// 	paste(getSheet(sheet, id), 'A', loggerRes, {
// 		notRemoveFilers: true,
// 		restrictCleanup: 'preserve',
// 	});

/**
 * Podstawowa funkcja "single". Wykonuje się i zapisuje czas w pliku
 *
 * @param {ExperimentSheet} target Obiekt z danymi na temat arkusza testowego
 * @param {ExperimentTasks} task
 */

const single = (target, task) => {
	/**
	 * @type {array[]} Docelowa tablica na dane z czasami wykonywania funkcji
	 */
	const loggerRes = [];

	performanceCheckerObj(
		loggerRes,
		task.callback(target),
		target.printName,
		task.desc,
		EXP_METHOD
	);

	// printTimes(task.sheet, WHERE_TO_PRINT[task.geo])();

	paste(getSheet(task.sheet, PRINT_TO[task.printTo]), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});
};

/**
 * Zwraca odpowieni arkusz do modyfikacji na podstawie parametru 'geo'
 * określającego czy ma być to external, local czy hub
 *
 * @param {string} geo Określenie 'ext', 'loc', 'hub'
 * @param {ExperimentSheet} target Numer celu arkusza np. target1
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Obiket arkusza
 */

const getProperSheet = (geo, target) => {
	if (geo === 'loc') return getSheet(target.sheetLocal);
	if (geo === 'hub') return getSheet(target.sheetHub, HUB);
	if (geo === 'ext')
		return getSheet(target.sheetExternal, target.externalUrl);
};

/**
 * Generator obiektu dla funkcji / zadania
 *
 * @param {string} printTo Do którego pliku ma wklejać dane. Musi odpowiadać obiektowi PRINT_TO z configu
 * @param {function} callback Skurowana funkcja do wykonania
 * @param {array} args Tablica argumentów dla callbacku
 * @param {string} name Nazwa arkusza do którego mają być wklejone dane oraz nazwa zadania do opisu
 * @returns {ExperimentTasks}
 */

const buildTask = (printTo, callback, args, name) => ({
	printTo,
	sheet: name,
	callback: callback(...args),
	desc: `${EXP_TITLE} : ${name} : ${printTo.toUpperCase()}`,
});

export { single, getProperSheet, buildTask };
