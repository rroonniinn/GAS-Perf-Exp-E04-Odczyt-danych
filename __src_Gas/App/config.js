/* eslint-disable max-lines */

import { isEmpty } from '../../../GAS | Library/v02/gas/isEmpty';

/**
 * @typedef {import('./types').ExperimentSheet} ExperimentSheet
 */

const EXP_TITLE = 'Odczyt : Całość';
const EXP_METHOD = 'Single Random';

/**
 * Długość arkuszy biorących udział w eksperymencie
 * @type {Object<string, object>}
 */

const SAMPLES = {
	s1: {
		size: 100,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	},
	s2: {
		size: 200,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	},
	s3: {
		size: 500,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	},
	s4: {
		size: 1000,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	},
	s5: {
		size: 2000,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	},
	s6: {
		size: 4000,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	},
	s7: {
		size: 8000,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	},
	s8: {
		size: 16000,
		externalUrl:
			'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg',
	},
};

/**
 * Arkusze testowe - na nich operują eksperymenty, więc nazywamy je celami
 * @type {Object<string, ExperimentSheet>} TARGET_SHEETS Dane arkuszy testowych
 */

const TARGET_SHEETS = {
	target1: {
		status: !isEmpty(SAMPLES.s1),
		printName: `Arr 1: ${SAMPLES.s1.size}`,
		size: SAMPLES.s1.size,
		sheetLocal: `${SAMPLES.s1.size}`,
		sheetHub: `${SAMPLES.s1.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s1.externalUrl}`,
	},
	target2: {
		status: !isEmpty(SAMPLES.s2),
		printName: `Arr 1: ${SAMPLES.s2.size}`,
		size: SAMPLES.s2.size,
		sheetLocal: `${SAMPLES.s2.size}`,
		sheetHub: `${SAMPLES.s2.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s2.externalUrl}`,
	},
	target3: {
		status: !isEmpty(SAMPLES.s3),
		printName: `Arr 1: ${SAMPLES.s3.size}`,
		size: SAMPLES.s3.size,
		sheetLocal: `${SAMPLES.s3.size}`,
		sheetHub: `${SAMPLES.s3.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s3.externalUrl}`,
	},
	target4: {
		status: !isEmpty(SAMPLES.s4),
		printName: `Arr 1: ${SAMPLES.s4.size}`,
		size: SAMPLES.s4.size,
		sheetLocal: `${SAMPLES.s4.size}`,
		sheetHub: `${SAMPLES.s4.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s4.externalUrl}`,
	},
	target5: {
		status: !isEmpty(SAMPLES.s5),
		printName: `Arr 1: ${SAMPLES.s5.size}`,
		size: SAMPLES.s5.size,
		sheetLocal: `${SAMPLES.s5.size}`,
		sheetHub: `${SAMPLES.s5.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s5.externalUrl}`,
	},
	target6: {
		status: !isEmpty(SAMPLES.s6),
		printName: `Arr 1: ${SAMPLES.s6.size}`,
		size: SAMPLES.s6.size,
		sheetLocal: `${SAMPLES.s6.size}`,
		sheetHub: `${SAMPLES.s6.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s6.externalUrl}`,
	},
	target7: {
		status: !isEmpty(SAMPLES.s7),
		printName: `Arr 1: ${SAMPLES.s7.size}`,
		size: SAMPLES.s7.size,
		sheetLocal: `${SAMPLES.s7.size}`,
		sheetHub: `${SAMPLES.s7.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s7.externalUrl}`,
	},
	target8: {
		status: !isEmpty(SAMPLES.s8),
		printName: `Arr 1: ${SAMPLES.s8.size}`,
		size: SAMPLES.s8.size,
		sheetLocal: `${SAMPLES.s8.size}`,
		sheetHub: `${SAMPLES.s8.size}`,
		sheetExternal: 'Data',
		externalUrl: `${SAMPLES.s8.externalUrl}`,
	},
};

/* *********************** PLIKI Z DANYMI ******************* */

/**
 * URLe z danymi dla Huba
 * @type {string} HUB_URL
 */

const HUB =
	'https://docs.google.com/spreadsheets/d/1N6GoUJWaSUTn1PSU1SqacMK9Ukj5p5342oeQY9wROO4';

/**
 * @type {Object<string, string>} obj
 */

const PRINT_TO = {
	loc:
		'https://docs.google.com/spreadsheets/d/1B_b7teyVoy6GEU2_ryGJClzZx2wZPw7IR8JvgtaFWYw/edit#gid=1328566787',
	hub:
		'https://docs.google.com/spreadsheets/d/1FyP335RxNUrtvEFxccNtUwN3LcuEh-2xj_wjB-knpY4/edit#gid=353722748',
	ext:
		'https://docs.google.com/spreadsheets/d/1dgcMuNFmn4Hdu2g395SdfpXc-8paJHwtQ0rs6i9lr5E/edit#gid=420631497',
	cache:
		'https://docs.google.com/spreadsheets/d/1wI2EmMLnHk6AHy5fVA7sNLhROTW1C4PrJcxwv_w5xBM/edit#gid=783264420',
};

export { PRINT_TO, HUB, TARGET_SHEETS, EXP_TITLE, EXP_METHOD };
