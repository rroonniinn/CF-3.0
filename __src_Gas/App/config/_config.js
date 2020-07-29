/** Tutaj znajdują się ustawienia bazowe oraz metody przekazujące
 * pozyskane na ich bazie dane do dalszego wykorzystania w aplikacji
 */

const accounts = {
	accountTypes: {
		id: ['asset', 'liability'],
		pl: ['Majątek', 'Zobowiązanie'],
	},
	equityType: [
		['id', 'group', 'pl'],
		['cash', 'other', 'Gotówka'],
		['bankAccountStand', 'bank', 'Konto ROR'],
		['bankAccountSave', 'bank', 'Konto Oszczędnościowe'],
		['bankAccountVat', 'bank', 'Konto VAT'],
		['bankCreditCard', 'bank', 'Kart Kredytowa'],
		['bankDeposit', 'bank', 'Lokata'],
		['capitalInvestment', 'other', 'Inwestycje kapitałowe'],
		['realEstate', 'other', 'Nieruchomości'],
		['loan', 'other', 'Pożyczka'],
		['mortgage', 'bank', 'Kredyt Hipoteczny'],
		['taxes', 'other', 'Podatki'],
	],
};

const templates = {
	account: {
		url:
			'https://docs.google.com/spreadsheets/d/1vNqNWoDLCAd11VsteTLU4bmZncN55eCe9nydeJqsW2o/edit#gid=0',
		sheet: 'actualData',
	},
};

const setup = {
	dbFolder: {
		url:
			'https://drive.google.com/drive/folders/1C5NZCya7Uhd2flDnBhQvsPCrFBPGqvyK',
	},
	dbAdmin: {
		ulr:
			'https://docs.google.com/spreadsheets/d/1NIqi1h6CIC-WT2yKTXgqJktlZhGnLbgS5HpcFaZs6Rs/edit#gid=1472854783',
		sheet: 'db',
		range: 'A2:Z',
	},
};

/**
 * Zwraca wartość equityType dla grupy 'bank'
 */

export const bankEquityTypes = () =>
	accounts.equityType
		.filter(([, group]) => group === 'bank')
		.map(([id]) => id);

export const { dbAdmin } = setup;
export { templates };
export { setup };
