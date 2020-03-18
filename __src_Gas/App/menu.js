// @ts-nocheck

import { exps } from './experiments';
import { regenerateCache } from './tasks';

global.menu = {
	test: () => console.log('hello'),
	exps,
	regenerateCache,
};

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
		.addItem('Test', 'menu.test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
