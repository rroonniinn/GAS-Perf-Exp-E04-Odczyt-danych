/* eslint-disable max-params */
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';

/* ***************** Helpers ******************* */

/**
 * @type {array[]} Docelowa tablica na dane z czasami wykonywania funkcji
 */
const loggerRes = [];

/**
 * Template rodzaju testu
 * @param {string} jobType
 * @returns {(callback: function, identifier: string, task: string) => any}
 */
const run = jobType => (callback, identifier, task) => () =>
	performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

const runJbJ = run('Job By Job');
const runTbT = run('Task By Task');

/**
 * Wkleja tablicę z czasami do wskazanego arkusza
 * @param {string} sheet
 */

const printTimes = sheet => () =>
	paste(getSheet(sheet), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});

/**
 * Odpala wskazaną liczbę razy przekazaną funkcję (callback) wklejając
 * wyniki (czasy wykonania) do wskazanego arkusza
 *
 * @param {number} quant Liczba wykonań testu
 * @param {function} callback Funkcja do wykonania
 * @param {function} testTypeCallback Funkcja z konkretnym rodzajem eksperymentu (jbj|tbt)
 * @param {string} desc Opis co robi funkcja (np. 'Wklejenie danych (cache)') pojawi się w tabeli jako opis zadania
 * @param {string} resSheet Nazwa arkusza do którego mają być wklejone wyniki (czasy)
 * @returns {function} Zwraca funkcję gotową do odpalenia
 */

const fire = (quant, callback, testTypeCallback, desc, resSheet) =>
	pipe(testTypeCallback(quant, callback, desc), printTimes(resSheet));
export { runJbJ, runTbT, fire };
