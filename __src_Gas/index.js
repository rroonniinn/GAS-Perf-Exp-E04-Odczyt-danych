/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-params */
/**
 * @typedef {import('./../../../../00. My Library/v02/experiments/types').ExpSheet} ExpSheet
 * @typedef {import('./../../../../00. My Library/v02/experiments/types').ExpTasks} ExpTasks
 * @typedef {import('./../../../../00. My Library/v02/gas/styleSheet').RangeOptions} RangeOptions
 */

import { setMenu } from '../../../../00. My Library/v02/gas/setMenu';
import { randomIntegersArray2d } from '../../../../00. My Library/v02/arr/randomIntegersArray2d';
import { crusherCache } from '../../../../00. My Library/v02/cache/crusherCache';
import { pipe } from '../../../../00. My Library/v02/fp/pipe';
import { getProperSheet } from '../../../../00. My Library/v02/experiments/getProperSheet';
import { runRandom } from '../../../../00. My Library/v02/experiments/runRandom';
import { buildStructure } from '../../../../00. My Library/v02/experiments/buildStructure';
import { getValues } from '../../../../00. My Library/v01/gas/getValues';
import {
	setEveryMin,
	setEveryH,
	stopTimeTriggers,
} from '../../../../00. My Library/v01/gas/timeTriggers';

import { EXP_SETUP } from './config';

/**
 * * Helper
 * Funkcja oczekująca tablicy funkcji z których będzie losowała te, które
 * mają właśnie się odpalić. Załadowany jest już do niej plik configu
 * @type {(arr: [string, function, string][]) => void}
 */

const go = runRandom(EXP_SETUP);

/* ******************************* ZADANIA ******************************** */

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} ver Wersja eksperymentu
 * @param {string} desc Opis z którego arkusza wzięte dane
 */

const printInfo = (geo, ver, desc) =>
	console.log(
		`** Got from ${geo.toUpperCase()} '${desc}' | Ver: ${ver}`
	);

/**
 * Zwraca odpowiedni zakres
 * @param {null|'short'|'full'} [ver] Sposób wyliczenia zakresu.
 * null - używa data range, short A1:O, full A1:O1000
 * @param {number} size Wielkość arkusza danych
 * @returns
 */

const getRange = (ver, size) => {
	if (!ver) return null;
	if (ver === 'short') return 'A1:O';
	if (ver === 'full') return `A1:O${size}`;
};

/**
 * Pobiera dane ze wskazanego źródła ze wskazanego arkusza
 * @param {'ext'|'loc'|'hub'} geo Strukura danych do pobrania
 * @param {null|'short'|'full'} [ver] Wersja zakresu. null - używa data; range, short A1:O, full A1:O1000
 * @return {(target: ExpSheet) => any} target Np. target1 czy target2
 */
const getFromSheet = (geo, ver) => target =>
	pipe(
		() => getProperSheet(geo, target, EXP_SETUP),
		sheet => getValues(sheet, getRange(ver, target.size)),
		() => printInfo(geo, ver, target.printName)
	)();

/**
 * Pobierz dane z cacha
 * @param {string} prefix Przedrostek odróżniający cache od siebie
 * do testów 1, 15, 30 min i 1h
 * @returns {(target: ExpSheet) => any} target Np. target1 czy target2
 */
const getFromCache = prefix => target =>
	pipe(
		() => crusherCache.get(`${prefix}${target.size}`),
		() => printInfo('cache', '1 min', target.printName)
	)();

/**
 * Helper:
 * Regeneruj cache - wygeneruj losowe liczby i wklej je do cacha
 */
const regenerateCache = () => {
	Object.values(EXP_SETUP.samples).forEach(size => {
		const data = randomIntegersArray2d(size, 15);
		crusherCache.put(`va${size}`, data, 360); // maxymalny czas cacha

		console.log(
			`Regenerated ${data.length} rows | First cell: ${data[0][0]}`
		);
	});
};

/* **************************** SETUP EXPERYMENTU ************************ */

// @ts-ignore
global.exp = {
	// Sety funkcji do losowania
	loc: go([
		['loc', getFromSheet('loc', null), 'a'],
		['loc', getFromSheet('loc', 'short'), 'b'],
		['loc', getFromSheet('loc', 'full'), 'c'],
	]),
	hub: go([
		['hub', getFromSheet('hub', null), 'a'],
		['hub', getFromSheet('hub', 'short'), 'b'],
		['hub', getFromSheet('hub', 'full'), 'c'],
	]),
	ext: go([
		['ext', getFromSheet('ext', null), 'a'],
		['ext', getFromSheet('ext', 'short'), 'b'],
		['ext', getFromSheet('ext', 'full'), 'c'],
	]),
	cache: go([['cache', getFromCache('va'), 'a']]),
	regenerateCache,
};

// @ts-ignore
global.utils = {
	buildStructure: () => buildStructure(EXP_SETUP),
	triggersFire: () => {
		setEveryH('exp.regenerateCache', 4);
		setEveryMin('exp.loc', 1);
		setEveryMin('exp.hub', 1);
		setEveryMin('exp.ext', 1);
		setEveryMin('exp.cache', 1);
	},
	triggersStop: stopTimeTriggers,
};

const menuElements = [
	['Zbuduj / zresetuj strukturę plików', 'utils.buildStructure'],
	[
		'Przetestuj funkcje',
		['Test : randomLocal', 'exp.loc'],
		['Test : randomHub', 'exp.hub'],
		['Test : randomExternal', 'exp.ext'],
		['Test : randomCache 1 min', 'exp.cache'],
		['Test : Regenerate cache', 'exp.regenerateCache'],
	],
	'-------------------',
	['Uruchom eksperyment', 'utils.triggersFire'],
	['Zatrzymaj eksperyment', 'utils.triggersStop'],
	'-------------------',
	['Update menu', 'onOpen'],
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuElements, 'ICON', true);
};

export { getFromSheet, getFromCache, regenerateCache };
