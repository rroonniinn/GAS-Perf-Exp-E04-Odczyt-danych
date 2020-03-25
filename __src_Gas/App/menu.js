// @ts-nocheck

import { ditributeToOtherFiles } from './ditributeToOtherFiles';
import { exps, runRandomSingle } from './experiments';
import { regenerateCache, getHub } from './tasks';

global.menu = {
	test: getHub('l100'),
	exps,
	runRandomSingle,
	regenerateCache,
	ditributeToOtherFiles,
};

// global.regenerateCache = () => {
// 	regenerateCache();
// };

// global.runRandomSingle = () => {
// 	runRandomSingle();
// };

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Exp: Odczyt lokalnie')
				.addItem('Job by Job', 'menu.exps.localJbJ')
				.addItem('Task by Task', 'menu.exps.localTbT')
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Exp: Odczyt external')
				.addItem('Job by Job', 'menu.exps.extJbJ')
				.addItem('Task by Task', 'menu.exps.extTbT')
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Exp: Odczyt cache')
				.addItem('Job by Job', 'menu.exps.cacheJbJ')
				.addItem('Task by Task', 'menu.exps.cacheTbT')
				.addSeparator()
				.addItem('Regenerate cache', 'menu.regenerateCache')
		)
		.addSeparator()
		.addItem('Random Single', 'menu.runRandomSingle')
		.addSeparator()
		.addItem('Distribute', 'menu.ditributeToOtherFiles')
		.addItem('Test', 'menu.test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
