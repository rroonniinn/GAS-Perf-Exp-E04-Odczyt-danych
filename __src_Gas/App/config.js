/* eslint-disable max-lines */
/**
 * @typedef {import('./types').ExpSheet} ExpSheet
 * @typedef {import('./types').ExpSetup} ExpSetup
 */

import { getProp } from '../../../GAS | Library/v01/gas/properties';

/* ******************************************************************** */
/* 										SEKCJA EDYTOWALNA
/* ******************************************************************** */

/**
 * Ustawienie całego eksperymentu
 * @type {ExpSetup} EXP_SETUP
 */

const EXP_SETUP = {
	title: 'Odczyt : Całość',
	method: 'Single Random',
	structure: {
		fixed: 'col',
		fixedSize: 15,
		randomData: true,
	},
	samples: {
		s1: 100,
		s2: 200,
		s3: 500,
		s4: 1000,
		s5: 2000,
		s6: 4000,
		s7: 8000,
		s8: 16000,
	},
	printTo: {
		loc: {
			prefix: 'A',
			name: 'Local',
			colorLight: '#34a853',
			colorDark: '#1f8b3c',
			sheetsMeaning: {
				a: 'DataRange',
				b: 'Full',
				c: 'Short',
				d: '',
				e: '',
				f: '',
			},
		},
		hub: {
			prefix: 'B',
			name: 'Hub',
			colorLight: '#34a853',
			colorDark: '#1f8b3c',
			sheetsMeaning: {
				a: 'DataRange',
				b: 'Full',
				c: 'Short',
				d: '',
				e: '',
				f: '',
			},
		},
		ext: {
			prefix: 'C',
			name: 'External',
			colorLight: '#34a853',
			colorDark: '#1f8b3c',
			sheetsMeaning: {
				a: 'Całość',
				b: 'Full',
				c: 'Short',
				d: '',
				e: '',
				f: '',
			},
		},
		cache: {
			prefix: 'D',
			name: 'Cache',
			colorLight: '#34a853',
			colorDark: '#1f8b3c',
			sheetsMeaning: {
				a: '1 min',
				b: '15 min',
				c: '30 min',
				d: '1 h',
				e: '',
				f: '',
			},
		},
	},
};

/* ******************************************************************** */
/* 										SEKCJA NIE EDYTOWALNA
/* ******************************************************************** */

/**
 * Template pliku, do którego wklejane są dane z wynikami eksperymentów
 * @type {string} TEMPLATE_PRINT_TO
 */
const TEMPLATE_PRINT_TO =
	'https://docs.google.com/spreadsheets/d/139mlb1yO8e_T8Bs25yX5kTiHaCvSNRuQf8RRyH2WpTg/edit#gid=1941260253';

/**
 * Nazwa arkusza z danymi w zewnętrznych plikach
 * @type {string} EXTERNAL_SHEET
 */
const EXTERNAL_SHEET = 'Dane';

/**
 * Nazwa folderu z plikami z testowymi danymi
 * @type {string} FILES_FOLDER
 */
const FILES_FOLDER = '_Pliki';

/**
 * Nazwa pliku z danymi do eksperymentów HUB
 * @type {string} HUB_NAME
 */
const HUB_NAME = 'externalHub';

/**
 * Obiekt z ID zewnętrznych plików z danymi do eksperymentów Ext.
 * Kluczami są s1, s2 itp. Ponieważ Apps Script sprawdza wszystko przed
 * odpaleniem, w sytuacji gdy jeszcze nie ma struktury propsy są puste,
 * aby nie wywalało błędu inicjuje je zatem pustym obiektem
 * @type {Object<string, string>} EXTERNAL_URLS
 */

const EXTERNALS = getProp('script', 'EXTERNALS') || {};
const { samples } = EXP_SETUP;
/**
 * Arkusze testowe - na nich operują eksperymenty, więc nazywamy je celami
 * @type {Object<string, ExpSheet>} TARGET_SHEETS Dane arkuszy testowych
 */

const TARGET_SHEETS = {
	target1: {
		status: !!samples.s1,
		printName: `Arr 1: ${samples.s1}`,
		size: samples.s1,
		sheetLocal: String(samples.s1),
		sheetHub: String(samples.s1),
		externalId: EXTERNALS.s1,
	},
	target2: {
		status: !!samples.s2,
		printName: `Arr 2: ${samples.s2}`,
		size: samples.s2,
		sheetLocal: String(samples.s2),
		sheetHub: String(samples.s2),
		externalId: EXTERNALS.s2,
	},
	target3: {
		status: !!samples.s3,
		printName: `Arr 3: ${samples.s3}`,
		size: samples.s3,
		sheetLocal: String(samples.s3),
		sheetHub: String(samples.s3),
		externalId: EXTERNALS.s3,
	},
	target4: {
		status: !!samples.s4,
		printName: `Arr 4: ${samples.s4}`,
		size: samples.s4,
		sheetLocal: String(samples.s4),
		sheetHub: String(samples.s4),
		externalId: EXTERNALS.s4,
	},
	target5: {
		status: !!samples.s5,
		printName: `Arr 5: ${samples.s5}`,
		size: samples.s5,
		sheetLocal: String(samples.s5),
		sheetHub: String(samples.s5),
		externalId: EXTERNALS.s5,
	},
	target6: {
		status: !!samples.s6,
		printName: `Arr 6: ${samples.s6}`,
		size: samples.s6,
		sheetLocal: String(samples.s6),
		sheetHub: String(samples.s6),
		externalId: EXTERNALS.s6,
	},
	target7: {
		status: !!samples.s7,
		printName: `Arr 7: ${samples.s7}`,
		size: samples.s7,
		sheetLocal: String(samples.s7),
		sheetHub: String(samples.s7),
		externalId: EXTERNALS.s7,
	},
	target8: {
		status: !!samples.s8,
		printName: `Arr 8: ${samples.s8}`,
		size: samples.s8,
		sheetLocal: String(samples.s8),
		sheetHub: String(samples.s8),
		externalId: EXTERNALS.s8,
	},
};

export {
	TARGET_SHEETS,
	TEMPLATE_PRINT_TO,
	EXTERNAL_SHEET,
	EXP_SETUP,
	FILES_FOLDER,
	HUB_NAME,
};
