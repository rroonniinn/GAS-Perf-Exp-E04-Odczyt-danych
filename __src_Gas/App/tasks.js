/* eslint-disable max-params */
import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { getValues } from '../../../GAS | Library/v01/gas/getValues';
import { crusherCache } from '../../../GAS | Library/v02/cache/crusherCache';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { getProperSheet, buildTask, single } from './helpers';
import { randomFromArray } from '../../../GAS | Library/v02/arr/randomFromArray';
import { TARGET_SHEETS } from './config';

/**
 * @typedef {import('./types').ExperimentSheet} ExperimentSheet
 * @typedef {import('./types').ExperimentTasks} ExperimentTasks
 */

/**
 * Obiekt z funkcjami generującymi losowe tablice z numerami od 0 do 1000
 * o różnej liczbie wierszy i 15 kolumnach
 * @type {Object<string, function>} generateRandomArrs
 */

const generateData = {
	s1: () => randomIntegersArray2d(100, 15),
	s2: () => randomIntegersArray2d(200, 15),
	s3: () => randomIntegersArray2d(500, 15),
	s4: () => randomIntegersArray2d(1000, 15),
	s5: () => randomIntegersArray2d(2000, 15),
	s6: () => randomIntegersArray2d(4000, 15),
	s7: () => randomIntegersArray2d(8000, 15),
	s8: () => randomIntegersArray2d(16000, 15),
};

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} desc Opis z którego arkusza wzięte dane
 * @returns {(val: array[]) => void}
 */
const printInfo = (geo, desc) => val =>
	console.log(`Got from ${geo} '${desc}' | ${val.length} rows`);

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
 * @return {(target: ExperimentSheet) => function} target Np. target1 czy target2
 */
const getFromSheet = (geo, ver) => target =>
	pipe(
		() => getProperSheet(geo, target),
		sheet => getValues(sheet, getRange(ver, target.size)),
		printInfo(geo, target.printName)
	);

/**
 * Pobierz dane z cacha
 * @param {ExperimentSheet} target Np. target1 czy target2
 * @returns {function}
 */
const getCache = () => target =>
	pipe(
		() => crusherCache.get(target.size),
		printInfo('cache', target.printName)
	);

/**
 * Helper:
 * Regeneruj cache - wygeneruj losowe liczby i wklej je do cacha
 */
const regenerateCache = () => {
	Object.keys(generateData).forEach(key => {
		const randomData = generateData[key]();
		crusherCache.put(key, randomData, 360); // maxymalny czas cacha
		console.log(
			`Regenerated ${randomData.length} rows | First cell: ${randomData[0][0]}`
		);
	});
};

/**
 * Obiekt z zadaniami / eksperymentami do wykonania
 * @type {ExperimentTasks[]}
 */

// Sety funkcji do losowania
const randomFnLoc = [
	buildTask('loc', getFromSheet, ['loc', null], 'DataRange Test'),
	buildTask('loc', getFromSheet, ['loc', 'short'], 'Short Test'),
	buildTask('loc', getFromSheet, ['loc', 'full'], 'Full Test'),
];

const randomFnHub = [
	buildTask('hub', getFromSheet, ['hub', null], 'DataRange'),
	buildTask('hub', getFromSheet, ['hub', 'short'], 'Short'),
	buildTask('hub', getFromSheet, ['hub', 'full'], 'Full'),
];

const randomFnExt = [
	buildTask('ext', getFromSheet, ['ext', null], 'DataRange'),
	buildTask('ext', getFromSheet, ['ext', 'short'], 'Short'),
	buildTask('ext', getFromSheet, ['ext', 'full'], 'Full'),
];

const randomFnCache = [buildTask('cache', getCache, [], 'Full')];

/**
 * Template losowego wyboru funkcji do wykonania
 * @param {ExperimentTasks[]} functionsSet
 */

const runRandom = functionsSet => () => {
	/**
	 * Tablica docelowych arkuszy (tylko zawierających dane)
	 * @type {array[]} getTargets
	 */

	const getTargets = Object.entries(TARGET_SHEETS).filter(
		([, { status }]) => status
	);

	const [[, target]] = randomFromArray(getTargets, 1);
	const [task] = randomFromArray(functionsSet, 1);

	console.log(getTargets, getTargets);
	console.log('target', target);
	console.log('task', task);

	// single(target, task);
};

const randomExternal = runRandom(randomFnExt);
const randomLocal = runRandom(randomFnLoc);
const randomHub = runRandom(randomFnHub);
const randomCache = runRandom(randomFnCache);

export {
	regenerateCache,
	randomExternal,
	randomLocal,
	randomHub,
	randomCache,
};

// export { regenerateCache, tasks };
