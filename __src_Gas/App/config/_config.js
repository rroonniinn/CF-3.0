import { getFolderId } from './getFolderId';

/** Tutaj znajdują się ustawienia bazowe oraz metody przekazujące
 * pozyskane na ich bazie dane do dalszego wykorzystania w aplikacji
 * @memberof Lib_Conf
 */

const setup = {
	// Arkusz z ustawieniami struktur na Drive
	drive: {
		confSheet: 'Drive',
		bankDumpUrl: 'A2',
		bankSortedUrl: 'A3',
		cleanAccountsUrl: 'A4',
		backupUrl: 'A5',
	},
	// Arkusz z ustawieniami struktur kont bankowych
	accounts: {
		confSheetName: 'Konta',
		individualAccountSheet: 'Wyciąg',
		rangeResult: 'A2:M',
		rangeResultsStart: ['A', 2],
		sheetStrucure: {
			lp: 0,
			id: 1,
			account: 2,
			date: 3,
			desc: 4,
			sum: 5,
			balance: 6,
			project: 7,
			subProject: 8,
			who: 9,
			comment: 10,
			categoryType: 11,
			categoryDate: 12,
		},
	},
	logs: {
		sheetName: 'Logs',
	},
	templates: {
		accountFileId: '1Ri-_MFQtKok0p6Yqpv4usri7ntd0XZ948joLKW1IpzA',
	},
	currencySign: {
		EUR: '€',
		USD: '$',
	},
	transactions: {
		sheet: 'Transakcje',
		rangeResults: 'A7:L',
		rangeResultsStart: ['A', 7],
		rangeSearchInputs: 'B3:K4',
		rangeResultNum: ['B', 1],
		// gdzie zaczyna się obszar nasłuchu edycji (kolumna G)
		modificationColumnStart: 7,
		// gdzie kończy się obszar nasłuchu edycji (kolumna I)
		modificationColumnEnd: 9,
		menu: {
			takeAction: '* * *',
			move: 'Przenieś do "Słownik: dodawanie"',
			moved: 'Przeniesione',
			modify: 'Modyfikuj transakcję',
			modified: 'Zmodyfikowany',
		},
	},
	categorisation: {
		delimiter: ' / ',
		auto: 'Auto',
		manual: 'Manual',
	},
	dictionary: {
		sheet: 'Słownik',
		range: 'A2:I',
		entriesRangeStart: ['A', 2],
	},
	dictionaryAdding: {
		sheet: 'Słownik: dodawanie',
		entriesRangeStart: ['A', 4],
		range: 'A4:H',
		strLengthThreshold: 100,
	},
	dictionaryManaging: {
		sheet: 'Słownik: zarządzanie',
		rangeResults: 'A6:J',
		rangeResultsStart: ['A', 6],
		rangeResultNum: ['B', 1],
		rangeSearchInputs: 'B3:I3',
		// gdzie zaczyna się obszar nasłuchu edycji (kolumna B)
		modificationColumnStart: 2,
		// gdzie kończy się obszar nasłuchu edycji (kolumna I)
		modificationColumnEnd: 9,
		menu: {
			takeAction: '* * *',
			modify: 'Modyfikuj wpis',
			remove: 'Usuń wpis',
			modified: 'Zmodyfikowany',
			removed: 'Usunięty',
		},
	},
	transfersManagement: {
		sheet: 'Słownik transfery',
		project: 'Transfer',
		subProjectOut: 'Wysłanie',
		subProjectIn: 'Odebranie',
	},
	cashManagement: {
		sheet: 'Słownik gotówka',
		/* Poniżej znacznik określający, że dany wpis gotówkowy w wyciągu
		nie został jeszcze przeniesiony do wyciągów gotówkowych */
		newEntryIndicator: '-NEW-',
		accountType: 'Gotówka',
		sheetStrucure: {
			id: 0,
			strA: 1,
			strB: 2,
			moreThan: 3,
			lessThan: 4,
			who: 5,
			comment: 6,
			categorisation: 7,
			account: 8,
		},
	},
	manual: {
		sheet: 'Dodawanie transakcji ręcznie',
		range: 'A3:G',
		sheetStrucure: {
			account: 0,
			date: 1,
			desc: 2,
			sum: 3,
			categoryGlue: 4,
			who: 5,
			comment: 6,
		},
	},
	compoundData: {
		sheet: 'All',
	},
};

/**
 * Zaraca krótki symbol waluty (np. '€').
 * Jeśli któtki symbol nie jest zdefiniowny w configu zwraca przekazany
 * długi symbol
 *
 * @param {string} currency Trzyznakowy symbol waluty - np. 'EUR'
 * @returns {string}
 */
export const getCurrencySign = currency =>
	setup.currencySign ? setup.currencySign[currency] : currency;

export const getAccountSetupSheetName = setup.accounts.confSheetName;
export const logsSheetName = setup.logs.sheetName;
export const dumpFolderId = getFolderId(
	setup.drive.confSheet,
	setup.drive.bankDumpUrl
);
export const bankFolderId = getFolderId(
	setup.drive.confSheet,
	setup.drive.bankSortedUrl
);
export const accountFolderId = getFolderId(
	setup.drive.confSheet,
	setup.drive.cleanAccountsUrl
);
export const accountTemplateId = setup.templates.accountFileId;
export const backupFolderId = getFolderId(
	setup.drive.confSheet,
	setup.drive.backupUrl
);
export const { accounts } = setup;
export const { transactions } = setup;
export const { dictionary } = setup;
export const { dictionaryAdding } = setup;
export const { dictionaryManaging } = setup;
export const { categorisation } = setup;
export const { cashManagement } = setup;
export const { transfersManagement } = setup;
export const { manual } = setup;
export const { compoundData } = setup;
