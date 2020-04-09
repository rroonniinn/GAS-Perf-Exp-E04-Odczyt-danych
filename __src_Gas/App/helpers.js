/* eslint-disable max-params */
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getProp } from '../../../GAS | Library/v01/gas/properties';

import { EXP_SETUP } from './config';

const { title, method, printTo, misc, samples } = EXP_SETUP;
const { externalsSheetName } = misc;

/**
 * @typedef {import('./types').ExpSheet} ExpSheet
 * @typedef {import('./types').ExpTasks} ExpTasks
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
	if (geo === 'ext')
		return getSheet(externalsSheetName, target.externalId);
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

/**
 * Obiekt z ID zewnętrznych plików z danymi do eksperymentów Ext.
 * Kluczami są s1, s2 itp. Ponieważ Apps Script sprawdza wszystko przed
 * odpaleniem, w sytuacji gdy jeszcze nie ma struktury propsy są puste,
 * aby nie wywalało błędu inicjuje je zatem pustym obiektem
 * @type {Object<string, string>} EXTERNAL_URLS
 */

const externals = getProp('script', 'EXTERNALS') || {};

/**
 * Arkusze testowe - na nich operują eksperymenty, więc nazywamy je celami
 * @type {Object<string, ExpSheet>} TARGET_SHEETS Dane arkuszy testowych
 */

const targets = {
	target1: {
		status: !!samples.s1,
		printName: `Arr 1: ${samples.s1}`,
		size: samples.s1,
		sheetLocal: String(samples.s1),
		sheetHub: String(samples.s1),
		externalId: externals.s1,
	},
	target2: {
		status: !!samples.s2,
		printName: `Arr 2: ${samples.s2}`,
		size: samples.s2,
		sheetLocal: String(samples.s2),
		sheetHub: String(samples.s2),
		externalId: externals.s2,
	},
	target3: {
		status: !!samples.s3,
		printName: `Arr 3: ${samples.s3}`,
		size: samples.s3,
		sheetLocal: String(samples.s3),
		sheetHub: String(samples.s3),
		externalId: externals.s3,
	},
	target4: {
		status: !!samples.s4,
		printName: `Arr 4: ${samples.s4}`,
		size: samples.s4,
		sheetLocal: String(samples.s4),
		sheetHub: String(samples.s4),
		externalId: externals.s4,
	},
	target5: {
		status: !!samples.s5,
		printName: `Arr 5: ${samples.s5}`,
		size: samples.s5,
		sheetLocal: String(samples.s5),
		sheetHub: String(samples.s5),
		externalId: externals.s5,
	},
	target6: {
		status: !!samples.s6,
		printName: `Arr 6: ${samples.s6}`,
		size: samples.s6,
		sheetLocal: String(samples.s6),
		sheetHub: String(samples.s6),
		externalId: externals.s6,
	},
	target7: {
		status: !!samples.s7,
		printName: `Arr 7: ${samples.s7}`,
		size: samples.s7,
		sheetLocal: String(samples.s7),
		sheetHub: String(samples.s7),
		externalId: externals.s7,
	},
	target8: {
		status: !!samples.s8,
		printName: `Arr 8: ${samples.s8}`,
		size: samples.s8,
		sheetLocal: String(samples.s8),
		sheetHub: String(samples.s8),
		externalId: externals.s8,
	},
};

/**
 * Tablica docelowych arkuszy (tylko zawierających dane)
 * @type {[string, ExpSheet][]} targets Tablica docelowych wielkości arkuszy
 */

const TARGETS = Object.entries(targets).filter(([, { status }]) => status);

export { single, getProperSheet, buildTask, TARGETS };
