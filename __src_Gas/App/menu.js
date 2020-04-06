import {
	startMinuteTrigger,
	startHourTrigger,
	cancelTimeTriggers,
} from '../../../GAS | Library/v01/gas/timeTriggers';

import {
	randomExternal,
	randomLocal,
	randomHub,
	randomCache,
	regenerateCache,
} from './tasks';

// import { regenerateCache } from './tasks';

// @ts-ignore
global.randomLocal = randomLocal;
// @ts-ignore
global.randomHub = randomHub;
// @ts-ignore
global.randomExternal = randomExternal;
// @ts-ignore
global.randomCache = randomCache;
// @ts-ignore
global.regenerateCache = regenerateCache;
// @ts-ignore
global.menu = {
	test: () => console.log('test'),

	triggers: {
		loc: () => startMinuteTrigger('randomLocal', 1),
		hub: () => startMinuteTrigger('randomHub', 1),
		ext: () => startMinuteTrigger('randomExternal', 1),
		cache: () => startMinuteTrigger('randomCache', 30),
		regenerateCache: () => startHourTrigger('regenerateCache', 4),
		stop: cancelTimeTriggers,
	},
};

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Test funkcji do odpalenia automatycznego')
				.addItem('Test : randomLocal', 'randomLocal')
				.addItem('Test : randomHub', 'randomHub')
				.addItem('Test : randomExternal', 'randomExternal')
				.addItem('Test : randomCache', 'randomCache')
				.addItem('Test : regenerateCache', 'regenerateCache')
		)

		.addSeparator()
		.addItem('Uruchom Trigger dla Random Local', 'menu.triggers.loc')
		.addItem('Uruchom Trigger dla Random Hub', 'menu.triggers.hub')
		.addItem(
			'Uruchom Trigger dla Random External',
			'menu.triggers.ext'
		)
		.addItem('Uruchom Trigger dla Random Cache', 'menu.triggers.cache')
		.addItem(
			'Uruchom Trigger dla Regenerate Cache',
			'menu.triggers.regenerateCache'
		)
		.addSeparator()
		.addItem('Zatrzymaj triggery', 'menu.triggers.stop')
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('DEV')
				.addItem('Test', 'menu.test')
				.addItem('Update menu', 'onOpen')
		)

		.addToUi();
};

export { menu };
