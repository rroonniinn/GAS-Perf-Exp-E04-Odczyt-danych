/* eslint-disable max-params */
/**
 * @typedef {import('./types').ExpSheet} ExpSheet
 * @typedef {import('./types').ExpTasks} ExpTasks
 */

import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { getValues } from '../../../GAS | Library/v01/gas/getValues';
import { crusherCache } from '../../../GAS | Library/v02/cache/crusherCache';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { randomFromArray } from '../../../GAS | Library/v02/arr/randomFromArray';

import { TARGET_SHEETS } from './config';
import { getProperSheet, buildTask, single } from './helpers';

/**
 * Tablica docelowych arkuszy (tylko zawierających dane)
 * @type {[string, ExpSheet][]} targets Tablica docelowych wielkości arkuszy
 */

const targets = Object.entries(TARGET_SHEETS).filter(
	([, { status }]) => status
);

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} desc Opis z którego arkusza wzięte dane
 * @returns {(val: array[]) => void}
 */
const printInfo = (geo, desc) => val =>
	console.log(`** Got from ${geo} '${desc}' | ${val.length} rows`);

/**
 *
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
 * @return {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const getFromSheet = (geo, ver) => target =>
	pipe(
		() => getProperSheet(geo, target),
		sheet => getValues(sheet, getRange(ver, target.size)),
		printInfo(geo, target.printName)
	);

/**
 * Pobierz dane z cacha
 * @param {string} prefix Przedrostek odróżniający cache od siebie
 * do testów 1, 15, 30 min i 1h
 * @returns {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const getCache = prefix => target =>
	pipe(
		() => crusherCache.get(`${prefix}${target.size}`),
		printInfo('cache', target.printName)
	);

/**
 * Helper:
 * Regeneruj cache - wygeneruj losowe liczby i wklej je do cacha
 */
const regenerateCache = () => {
	targets.forEach(([, { size }]) => {
		const data = randomIntegersArray2d(size, 15);
		crusherCache.put(`va${size}`, data, 360); // maxymalny czas cacha
		crusherCache.put(`vb${size}`, data, 360); // maxymalny czas cacha
		crusherCache.put(`vc${size}`, data, 360); // maxymalny czas cacha
		crusherCache.put(`vd${size}`, data, 360); // maxymalny czas cacha

		console.log(
			`Regenerated ${data.length} rows | First cell: ${data[0][0]}`
		);
	});
};

/**
 * Obiekt z zadaniami / eksperymentami do wykonania. Pierwszy argument
 * musi się zgadzać z tabelą printTo w EXP_SETUP
 * @type {ExpTasks[]}
 */

// Sety funkcji do losowania
const randomFnLoc = [
	buildTask('loc', getFromSheet, ['loc', null], 'a'),
	buildTask('loc', getFromSheet, ['loc', 'short'], 'b'),
	buildTask('loc', getFromSheet, ['loc', 'full'], 'c'),
];

const randomFnHub = [
	buildTask('hub', getFromSheet, ['hub', null], 'a'),
	buildTask('hub', getFromSheet, ['hub', 'short'], 'b'),
	buildTask('hub', getFromSheet, ['hub', 'full'], 'c'),
];

const randomFnExt = [
	buildTask('ext', getFromSheet, ['ext', null], 'a'),
	buildTask('ext', getFromSheet, ['ext', 'short'], 'b'),
	buildTask('ext', getFromSheet, ['ext', 'full'], 'c'),
];

// Przygotowanie zadań dla casha odpytywanego co 1, 15 i 30 min
const randomFnCacheA = [buildTask('cache', getCache, ['va'], 'a')];
const randomFnCacheB = [buildTask('cache', getCache, ['vb'], 'b')];
const randomFnCacheC = [buildTask('cache', getCache, ['vc'], 'c')];
const randomFnCacheD = [buildTask('cache', getCache, ['vd'], 'd')];

/**
 * Template losowego wyboru funkcji do wykonania
 * @param {ExpTasks[]} functionsSet
 */

const runRandom = functionsSet => () => {
	const [[, target]] = randomFromArray(targets, 1);
	const [task] = randomFromArray(functionsSet, 1);

	single(target, task);
};

const randomExternal = runRandom(randomFnExt);
const randomLocal = runRandom(randomFnLoc);
const randomHub = runRandom(randomFnHub);
const randomCacheA = runRandom(randomFnCacheA);
const randomCacheB = runRandom(randomFnCacheB);
const randomCacheC = runRandom(randomFnCacheC);
const randomCacheD = runRandom(randomFnCacheD);

export {
	regenerateCache,
	randomExternal,
	randomLocal,
	randomHub,
	randomCacheA,
	randomCacheB,
	randomCacheC,
	randomCacheD,
};

// export { regenerateCache, tasks };
