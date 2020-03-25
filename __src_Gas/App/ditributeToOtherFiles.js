/**
 * Rozdzielenie danych z jednego pliku na niezależne
 */

import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { copySheetsToOther } from '../../../GAS | Library/v02/gas/copySheetsToOther';
import { paste } from '../../../GAS | Library/v02/gas/paste';

const TEMPLATE = {
	url:
		'https://docs.google.com/spreadsheets/d/1Z2bqYpy2UA4QLhs5GXZNbxA2ZXOOk_pmyRbkufbfbI4/edit#gid=1817049872',
	sheet: 'Template',
};

const EXTERNALS = {
	jbj: {
		url:
			'https://docs.google.com/spreadsheets/d/1h5r1SD63c0x1F7VK0hRa315U228vOv32tfJblaIyo5g/edit#gid=0',
		sheetScheme: '(JbJ)',
		header: 'Odczyt - Cały arkusz (Job by Job)',
		// types: 'Job By Job',
	},
	single: {
		url:
			'https://docs.google.com/spreadsheets/d/1B_b7teyVoy6GEU2_ryGJClzZx2wZPw7IR8JvgtaFWYw/edit#gid=0',
		sheetScheme: '(Single)',
		header: 'Odczyt - Cały arkusz (Single Random)',
		// types: 'Job By Job',
	},
	tbt: {
		url:
			'https://docs.google.com/spreadsheets/d/1RQekFfaRxxtK2U6t_Pp82wNKSHwUPa8o5iM47aIYSoU/edit#gid=0',
		sheetScheme: '(TbT)',
		header: 'Odczyt - Cały arkusz (Task by Task)',
		// types: 'Job By Job',
	},
};

/**
 *
 *
 * @param {string} taskCode - np. sortedJbJ
 */
const ditribute = taskCode => {
	// Pobierz plik docelowy
	const targetId = getIdFromUrl(EXTERNALS[taskCode].url);

	// pobierz istniejace
	const sources = SpreadsheetApp.getActive()
		.getSheets()
		.filter(sheet =>
			sheet.getName().includes(EXTERNALS[taskCode].sheetScheme)
		);

	// dla każdego sheeta powyższego wyknaj:
	sources.forEach(srcSheet => {
		// skopiuj arkusz z templatem
		copySheetsToOther(getIdFromUrl(TEMPLATE.url), targetId, sheet =>
			sheet.getName().includes('Template')
		);

		// pobierz skopiowany arkusz
		const sheetToPaste = getSheet('Template', targetId);

		// pobierz dane i pozostaw tylk pasujące do wzoru
		const data = srcSheet.getRange('A3:E').getValues();
		// .filter(
		// 	([, , , , type]) => type === EXTERNALS[taskCode].types
		// );

		const srcSheetName = srcSheet.getName();

		// wklej i zmień nazwę i nagłówek
		paste(sheetToPaste, 'A', data, {
			restrictCleanup: 'down',
		})
			.setName(srcSheetName)
			.collapseAllRowGroups()
			.getRange('AT1')
			.setValue(EXTERNALS[taskCode].header)
			.getSheet()
			.getRange('A1:BJ2')
			.setBackground('#34a853');
	});

	// sheet do wywalenia
	const sheetToDel = getSheet('Sheet1', targetId);
	if (sheetToDel) {
		sheetToDel.getParent().deleteSheet(sheetToDel);
	}
};

const ditributeToOtherFiles = () => {
	Object.keys(EXTERNALS).forEach(code => ditribute(code));
};

export { ditributeToOtherFiles };
