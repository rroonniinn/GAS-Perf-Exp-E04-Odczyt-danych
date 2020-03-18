/**
 * Times Sheets
 * @typedef {Object} TimesSheets
 * @property {string} LOCAL Wklejka lokalna
 * @property {string} EXTER Wklejka do zewnętrznych plików
 * @property {string} CACHE Wklejka do cacha
 */
/**
 * @type {TimesSheets} SHEETS Arkusze do wklejania wyników eksperymentów
 */
const SHEETS = {
	LOCAL: 'T: Odczyt lokalnie',
	EXTER: 'T: Odczyt external',
	CACHE: 'T: Odczyt cache',
};

/**
 * Arkusze lokalne z których pobieramy dane podczas eksperymentu
 * @type {Object<string, string>} LOCAL_SHEET
 */
const LOCAL_SHEET = {
	l100: 'res100',
	l200: 'res200',
	l500: 'res500',
	l1000: 'res1000',
	l2000: 'res2000',
	l4000: 'res4000',
	l8000: 'res8000',
	l16000: 'res16000',
};

/**
 * URLe zewnętrznych arkuszy z których pobieramy dane (pochodzą
 * z eksperymentu https://docs.google.com/spreadsheets/d/1qV5DkLLS2XcZC2Oc3QsikbOtsA41N2PNBKyZghWbytY/edit#gid=1946600950)
 * @type {Object<string, string>} EXT_SHEET_URL
 */
const EXT_SHEET_URL = {
	l100:
		'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	l200:
		'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	l500:
		'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	l1000:
		'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	l2000:
		'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	l4000:
		'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	l8000:
		'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	l16000:
		'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg',
};
/**
 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się dane
 * @type {string} EXT_SHEET_NAME
 */
const EXT_SHEET_NAME = 'res';

export { SHEETS, LOCAL_SHEET, EXT_SHEET_URL, EXT_SHEET_NAME };
