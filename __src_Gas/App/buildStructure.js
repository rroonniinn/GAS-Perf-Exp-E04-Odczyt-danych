/* eslint-disable max-lines */
/* eslint-disable max-nested-callbacks */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */

/**
 * @typedef {import('./types').PrintResults} PrintResults
 */

import { copyFile } from '../../../GAS | Library/v02/gas/copyFile';
import { addToProps } from '../../../GAS | Library/v01/gas/properties';
import { adjustColumns } from '../../../GAS | Library/v01/gas/adjustColumns';
import { adjustRows } from '../../../GAS | Library/v01/gas/adjustRows';
import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { deleteSheets } from '../../../GAS | Library/v01/gas/deleteSheets';
import { createFolder } from '../../../GAS | Library/v02/gas/createFolder';
import { getContainingFolder } from '../../../GAS | Library/v01/gas/getContainingFolder';
import { createSpreadsheetIn } from '../../../GAS | Library/v02/gas/createSpreadsheetIn';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { seq } from '../../../GAS | Library/v01/fp/seq';

import { EXP_SETUP } from './config';

const { title, structure, samples, printTo, misc } = EXP_SETUP;
const { fixedSize, fixed, randomData } = structure;
const {
	templatPrintTo,
	externalsSheetName,
	dataFolder,
	hubName,
	externalsPrefix,
	printToSubname,
} = misc;

/**
 * Tablica rozmiarów arkuszy które mają się znależć w plikach
 * @type {{code: string, size: number}[]} betterSamples
 */

const samplesArr = Object.entries(samples).map(([code, size]) => ({
	code,
	size,
}));

/**
 * Skoroszyt do którego dopięty jest skrypt (bound)
 * @type {GoogleAppsScript.Spreadsheet.Spreadsheet} ssLocal
 */

const localSpreadsheet = SpreadsheetApp.getActive();

/**
 * Folder, w którym znajduje się plik ze skryptem (bouund) eksperymentu
 * @type {GoogleAppsScript.Drive.Folder} experimentRoot
 */

const experimentRoot = getContainingFolder(localSpreadsheet);

/**
 * Tworzy pliki z wynikami eksperymentów (w katalogu w którym znajduje
 * się plik ze skryptem)
 * @param {Object} urls Pusty obiekt do którego funkcja wrzuci Id plików wynikowych
 * @returns {([string, PrintResults]) => void}
 */

const buildPrintToFiles = urls => ([geo, fileData]) => {
	/* Utwórz plik na bazie templatu */
	const name = `${title} : ${printToSubname} : ${fileData.prefix}. ${fileData.name}`;
	const newFileId = copyFile(
		templatPrintTo,
		name,
		experimentRoot
	).getId();

	/* Zmodyfikuj wygląd i dane */
	SpreadsheetApp.openById(newFileId)
		.getSheetByName('Wyniki')
		.getRange('A1:E4')
		.setBackground(fileData.colorDark)
		.getSheet()
		.getRange('A5:E')
		.setBackground(fileData.colorLight)
		.getSheet()
		.getParent()
		.getSheetByName('helper')
		.getRange('B1')
		.setValue(title)
		.getSheet()
		.getRange('B2')
		.setValue(fileData.name)
		.getSheet()
		.getRange('E4:E9')
		.setValues(Object.values(fileData.sheetsMeaning).map(val => [val]))
		.getSheet()
		.getParent()
		.getSheets()
		.filter(sheet => /[A-Z]$/.test(sheet.getName()))
		.forEach(sheet =>
			sheet.getRange('A1:BK2').setBackground(fileData.colorLight)
		);

	urls[geo] = newFileId;
};

/**
 * Wstawia odpowiedni arkusz z właściwą nazwą, rozmiarem i danymi
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 * @returns {(quant: number) => GoogleAppsScript.Spreadsheet.Sheet} Wstawiony sheet
 */

const insertProperSheet = spreadsheet => quant => {
	// Wstaw arkusz
	const sheet = spreadsheet.insertSheet(`${quant}`);

	// Dopasuje zafiksowany wymiar
	if (fixed === 'col') {
		adjustColumns(sheet, fixedSize);
		adjustRows(sheet, quant);
	} else if (fixed === 'row') {
		adjustRows(sheet, fixedSize);
		adjustColumns(sheet, quant);
	}

	// Wypełnij danymi
	if (randomData) {
		if (fixed === 'col') {
			paste(sheet, 'A', randomIntegersArray2d(quant, fixedSize));
		} else if (fixed === 'row') {
			paste(sheet, 'A', randomIntegersArray2d(fixedSize, quant));
		}
	}
	return sheet;
};

/**
 * Dodaje do Skoroszytu ze skryptem arkusze z danymi do eksperymentu
 */

const buildLocalFile = () => {
	samplesArr
		.map(({ size }) => size)
		.forEach(insertProperSheet(localSpreadsheet));

	deleteSheets(
		localSpreadsheet,
		sheet =>
			!samplesArr
				.map(({ size }) => String(size))
				.includes(sheet.getName())
	);
};

/**
 * Buduje plik Huba
 * @param {GoogleAppsScript.Drive.Folder} parent Folder katalogu w którym ma być utworzony plik
 */

const buildHub = parent => {
	const hubSpreadsheet = createSpreadsheetIn(parent, hubName);
	samplesArr
		.map(({ size }) => size)
		.forEach(insertProperSheet(hubSpreadsheet));

	deleteSheets(
		hubSpreadsheet,
		sheet =>
			!samplesArr
				.map(({ size }) => String(size))
				.includes(sheet.getName())
	);

	addToProps('script', 'HUB', hubSpreadsheet.getId());
};

/**
 * Tworzy pliki z danymi do eksperymentów external
 * @param {GoogleAppsScript.Drive.Folder} parent Folder katalogu w którym ma być utworzony plik
 */

const buildExternals = parent => {
	const urls = {};

	samplesArr.forEach(({ code, size }) => {
		const externalSpreadsheet = createSpreadsheetIn(
			parent,
			`${externalsPrefix}${size}`
		);
		insertProperSheet(externalSpreadsheet)(size).setName(
			externalsSheetName
		);
		deleteSheets(
			externalSpreadsheet,
			sheet => sheet.getName() !== externalsSheetName
		);

		urls[code] = externalSpreadsheet.getId();
	});

	addToProps('script', 'EXTERNALS', urls);
};

/**
 * Buduje strukruę danych niezbędnych dla eksperymentów
 */
const buildStructure = () => {
	// 1. Pliki z wynikami
	const urls = {};
	Object.entries(printTo).forEach(buildPrintToFiles(urls));
	addToProps('script', 'PRINT_TO_PROPS', urls);

	// 2. Pliki z danymi
	pipe(
		buildLocalFile,
		() => createFolder(experimentRoot, dataFolder),
		seq(buildHub, buildExternals)
	)();
};

export { buildStructure };
