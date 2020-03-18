/* eslint-disable max-params */
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { getLocal, getExternal, getCache } from './tasks';
import { runJbJ, runTbT, fire } from './helpers';

import { SHEETS } from './config';

/* ***************** Strukrura testów ******************* */

/**
 * Odpalenie 'times' razy każdego zadania i przejście do następnego
 * @param {number} times
 * @param {function} callback Którą funkcję mam zastosowac
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const jbj = (times, callback, desc) => () => {
	looper(times, runJbJ(callback('l100'), 'Arr 1: 100', desc));
	looper(times, runJbJ(callback('l200'), 'Arr 2: 200', desc));
	looper(times, runJbJ(callback('l500'), 'Arr 3: 500', desc));
	looper(times, runJbJ(callback('l1000'), 'Arr 4: 1000', desc));
	looper(times, runJbJ(callback('l2000'), 'Arr 5: 2000', desc));
	looper(times, runJbJ(callback('l4000'), 'Arr 6: 4000', desc));
	looper(times, runJbJ(callback('l8000'), 'Arr 7: 8000', desc));
	looper(times, runJbJ(callback('l16000'), 'Arr 8: 16000', desc));
};

/**
 * Odpalenie 'times' razy sekwencji składającej się ze wszystkich zadań
 * @param {number} times
 * @param {function} callback
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const tbt = (times, callback, desc) => () => {
	looper(times, () => {
		runTbT(callback('l100'), 'Arr 1: 100', desc)();
		runTbT(callback('l200'), 'Arr 2: 200', desc)();
		runTbT(callback('l500'), 'Arr 3: 500', desc)();
		runTbT(callback('l1000'), 'Arr 4: 1000', desc)();
		runTbT(callback('l2000'), 'Arr 5: 2000', desc)();
		runTbT(callback('l4000'), 'Arr 6: 4000', desc)();
		runTbT(callback('l8000'), 'Arr 7: 8000', desc)();
		runTbT(callback('l16000'), 'Arr 8: 16000', desc)();
	});
};

const DESC = 'Odczyt danych ';

/**
 * Obiekt ze wszystkimi callbackami do eksperymetów
 */
const exps = {
	/* LOCAL */
	localJbJ: fire(30, getLocal, jbj, `${DESC}(local)`, SHEETS.LOCAL),
	localTbT: fire(30, getLocal, tbt, `${DESC}(local)`, SHEETS.LOCAL),

	/* EXTERNAL */
	extJbJ: fire(30, getExternal, jbj, `${DESC}(external)`, SHEETS.EXTER),
	extTbT: fire(30, getExternal, tbt, `${DESC}(external)`, SHEETS.EXTER),

	/* CACHE */
	cacheJbJ: fire(50, getCache, jbj, `${DESC}(cache)`, SHEETS.CACHE),
	cacheTbT: fire(50, getCache, tbt, `${DESC}(cache)`, SHEETS.CACHE),
};

export { exps };
