/* eslint-disable max-lines-per-function */
import {
	startMinuteTrigger,
	startHourTrigger,
	cancelTimeTriggers,
} from '../../../GAS | Library/v01/gas/timeTriggers';

import { buildStructure } from './buildStructure';

import {
	randomExternal,
	randomLocal,
	randomHub,
	regenerateCache,
	randomCacheA,
	randomCacheB,
	randomCacheC,
	randomCacheD,
} from './tasks';

// @ts-ignore
global.randomLocal = randomLocal;
// @ts-ignore
global.randomHub = randomHub;
// @ts-ignore
global.randomExternal = randomExternal;
// @ts-ignore
global.randomCacheA = randomCacheA;
// @ts-ignore
global.randomCacheB = randomCacheB;
// @ts-ignore
global.randomCacheC = randomCacheC;
// @ts-ignore
global.randomCacheD = randomCacheD;
// @ts-ignore
global.regenerateCache = regenerateCache;

// @ts-ignore
global.menu = {
	test: () => console.log('aaa'),
	buildStructure,
	triggers: {
		loc: () => startMinuteTrigger('randomLocal', 1),
		hub: () => startMinuteTrigger('randomHub', 1),
		ext: () => startMinuteTrigger('randomExternal', 1),
		cacheA: () => startMinuteTrigger('randomCacheA', 1),
		cacheB: () => startMinuteTrigger('randomCacheB', 15),
		cacheC: () => startMinuteTrigger('randomCacheC', 30),
		cacheD: () => startHourTrigger('randomCacheD', 1),
		regenerateCache: () => startHourTrigger('regenerateCache', 4),
		stop: cancelTimeTriggers,
	},
};

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addItem('Zbuduj strukturę plików', 'menu.buildStructure')
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Test funkcji do odpalenia automatycznego')
				.addItem('Test : randomLocal', 'randomLocal')
				.addItem('Test : randomHub', 'randomHub')
				.addItem('Test : randomExternal', 'randomExternal')
				.addSeparator()
				.addItem('Test : randomCache 1 min', 'randomCacheA')
				.addItem('Test : randomCache 15 min', 'randomCacheB')
				.addItem('Test : randomCache 30 min', 'randomCacheC')
				.addItem('Test : randomCache 1h', 'randomCacheD')
				.addSeparator()
				.addItem('Test : regenerateCache', 'regenerateCache')
		)

		.addSeparator()
		.addItem('Uruchom Trigger dla Random Local', 'menu.triggers.loc')
		.addItem('Uruchom Trigger dla Random Hub', 'menu.triggers.hub')
		.addItem(
			'Uruchom Trigger dla Random External',
			'menu.triggers.ext'
		)
		.addSeparator()
		.addItem(
			'Uruchom Trigger dla Random Cache 1 min',
			'menu.triggers.cacheA'
		)
		.addItem(
			'Uruchom Trigger dla Random Cache 15 min',
			'menu.triggers.cacheB'
		)
		.addItem(
			'Uruchom Trigger dla Random Cache 30 min',
			'menu.triggers.cacheD'
		)
		.addItem(
			'Uruchom Trigger dla Random Cache 1 h',
			'menu.triggers.cacheC'
		)
		.addSeparator()
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
