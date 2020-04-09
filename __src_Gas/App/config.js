/**
 * @typedef {import('./types').ExpSetup} ExpSetup
 */

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
	misc: {
		templatPrintTo:
			'https://docs.google.com/spreadsheets/d/139mlb1yO8e_T8Bs25yX5kTiHaCvSNRuQf8RRyH2WpTg/edit#gid=1941260253',
		printToSubname: 'Wyniki',
		dataFolder: '_Pliki',
		externalsSheetName: 'Dane',
		externalsPrefix: 'file',
		hubName: 'externalHub',
	},
};

export { EXP_SETUP };
