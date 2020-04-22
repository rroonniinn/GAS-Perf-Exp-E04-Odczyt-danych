/**
 * Kolory eksperymentu
 */
const colors = {
	light: '#34a853',
	dark: '#1f8b3c',
	accent: '#ffff00',
};

/**
 * Ustawienie całego eksperymentu
 * @type {import('./../../../../00. My Library/v02/experiments/types').ExpSetup} EXP_SETUP
 */

const EXP_SETUP = {
	title: 'Odczyt : Całość (1 min)',
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
	results: {
		loc: {
			prefix: 'A',
			name: 'Local',
			colorLight: colors.light,
			colorDark: colors.dark,
			accentColor: colors.accent,
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
			colorLight: colors.light,
			colorDark: colors.dark,
			accentColor: colors.accent,
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
			colorLight: colors.light,
			colorDark: colors.dark,
			accentColor: colors.accent,
			sheetsMeaning: {
				a: 'DataRange',
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
			colorLight: colors.light,
			colorDark: colors.dark,
			accentColor: colors.accent,
			sheetsMeaning: {
				a: '1 min',
				b: '',
				c: '',
				d: '',
				e: '',
				f: '',
			},
		},
	},
	misc: {
		resultsTemplate:
			'https://docs.google.com/spreadsheets/d/139mlb1yO8e_T8Bs25yX5kTiHaCvSNRuQf8RRyH2WpTg/edit#gid=1941260253',
		printToSubname: 'Wyniki',
		dataFolder: '_Pliki',
		externalsSheetName: 'Dane',
		externalsPrefix: 'file',
		scriptFileSufix: 'Skrypt + Local',
		hubName: 'externalHub',
		dashboardName: 'Dashboard',
		dashboardMainSheet: 'Dashboard',
		dashboardDataSheet: 'h_dropData',
		dashboardTemplate:
			'https://docs.google.com/spreadsheets/d/1uPhrwk4YD0-7ZXDVdKKUZ5ACjk-WCfbhBBqIAe4SiUI/edit#gid=880283590',
		dashboardColor: colors.light,
	},
};

export { EXP_SETUP };
