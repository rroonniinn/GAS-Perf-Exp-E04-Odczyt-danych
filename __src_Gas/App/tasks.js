import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getValues } from '../../../GAS | Library/v01/gas/getValues';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { crusherCache } from '../../../GAS | Library/v02/cache/crusherCache';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';

import { LOCAL_SHEET, EXT_SHEET_URL, EXT_SHEET_NAME } from './config';

/**
 * Obiekt z funkcjami generującymi losowe tablice z numerami od 0 do 1000
 * o różnej liczbie wierszy i 15 kolumnach
 * @type {Object<string, function>} generateRandomArrs
 */

const generateData = {
	l100: () => randomIntegersArray2d(100, 15),
	l200: () => randomIntegersArray2d(200, 15),
	l500: () => randomIntegersArray2d(500, 15),
	l1000: () => randomIntegersArray2d(1000, 15),
	l2000: () => randomIntegersArray2d(2000, 15),
	l4000: () => randomIntegersArray2d(4000, 15),
	l8000: () => randomIntegersArray2d(8000, 15),
	l16000: () => randomIntegersArray2d(16000, 15),
};
/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} src Źródło np. external
 * @param {string} taskCode Kod zadania (wypełnia się automatycznie)
 * @returns {(val: array[]) => void}
 */
const printInfo = (src, taskCode) => val =>
	console.log(`Got from ${src} '${taskCode}' | ${val.length} rows`);

/**
 * Pobiera dane z lokalnego arkusza
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 * @returns {function}
 */
const getLocal = taskCode =>
	pipe(
		() => getSheet(LOCAL_SHEET[taskCode]),
		getValues,
		printInfo('local', taskCode)
	);

/**
 * Wygeneruj losowe liczby i wklej je do zewnętrznego arkusza
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 * @returns {function}
 */
const getExternal = taskCode =>
	pipe(
		() =>
			getSheet(
				EXT_SHEET_NAME,
				getIdFromUrl(EXT_SHEET_URL[taskCode])
			),
		getValues,
		printInfo('external', taskCode)
	);

/**
 * Pobierz dane z cacha
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 * @returns {function}
 */
const getCache = taskCode =>
	pipe(() => crusherCache.get(taskCode), printInfo('cache', taskCode));

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

export { getLocal, getExternal, getCache, regenerateCache };
