/* eslint-disable max-params */
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getProp } from '../../../GAS | Library/v01/gas/properties';

import { EXTERNAL_SHEET, EXP_SETUP } from './config';

const { title, method, printTo } = EXP_SETUP;

/**
 * @typedef {import('./config').ExpSheet} ExpSheet
 * @typedef {import('./tasks').ExpTasks} ExpTasks
 */

/**
 * @type {Object<string, string>} Obiekt pobrany z propsów zawierający ID
 * plików, do których wklejane są wyniki eksperymentów. Kluczem jest np.
 * loc, hub czy też ext. Wartością jest id pliku.
 */

const PRINT_TO_PROPS = getProp('script', 'PRINT_TO_PROPS');

/**
 * @type {string} ID pliku HUBa, którym znajdują się arkusze dla
 * eksperymentu typu "hub"
 */

const HUB = getProp('script', 'HUB');

/**
 * Podstawowa funkcja "single". Wykonuje się i zapisuje czas w pliku
 *
 * @param {ExpSheet} target Obiekt z danymi na temat arkusza testowego
 * @param {ExpTasks} task
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
		method
	);

	paste(getSheet(task.sheet, PRINT_TO_PROPS[task.geo]), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});
};

/**
 * Zwraca odpowieni arkusz do modyfikacji na podstawie parametru 'geo'
 * określającego czy ma być to external, local czy hub
 *
 * @param {string} geo Określenie 'ext', 'loc', 'hub'
 * @param {ExpSheet} target Numer celu arkusza np. target1
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Obiket arkusza
 */

const getProperSheet = (geo, target) => {
	if (geo === 'loc') return getSheet(target.sheetLocal);
	if (geo === 'hub') return getSheet(target.sheetHub, HUB);
	if (geo === 'ext') return getSheet(EXTERNAL_SHEET, target.externalId);
};

/**
 * Generator obiektu dla funkcji / zadania
 *
 * @param {'loc'|'hub'|'ext'|'cache'} geo Do którego pliku ma wklejać dane. Musi odpowiadać obiektowi printTo z EXP_SETUP z configu
 * @param {function} callback Skurowana funkcja do wykonania
 * @param {array} args Tablica argumentów dla callbacku
 * @param {'a'|'b'|'c'|'d'|'e'|'f'} sheetSym Symbol arkusza do którego mają być wklejone dane. Na jego podstawie wpisywany jest nazwa zadania do opisu
 * @returns {ExpTasks}
 */

const buildTask = (geo, callback, args, sheetSym) => ({
	geo,
	sheet: sheetSym.toUpperCase(),
	callback: callback(...args),
	desc: `${title} : ${printTo[geo].name} : ${printTo[geo].sheetsMeaning[sheetSym]}`,
});

export { single, getProperSheet, buildTask };
