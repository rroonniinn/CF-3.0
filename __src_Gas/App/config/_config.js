import { getValueIdxes } from '../../../../../00. My Library/v02/db/getValueIdxes';

/** Tutaj znajdują się ustawienia bazowe oraz metody przekazujące
 * pozyskane na ich bazie dane do dalszego wykorzystania w aplikacji
 */

const accounts = {
	accountTypes: {
		id: ['asset', 'liability'],
		pl: ['Majątek', 'Zobowiązanie'],
	},
	equityType: {
		id: [
			'bankAccountStand',
			'bankAccountSave',
			'bankAccountVat',
			'bankCreditCard',
			'bankDeposit',
			'mortgage',
			'cash',
			'capitalInvestment',
			'realEstate',
			'loan',
			'taxes',
		],
		group: [
			'bank',
			'bank',
			'bank',
			'bank',
			'bank',
			'bank',
			'other',
			'other',
			'other',
			'other',
			'other',
		],
		pl: [
			'Konto ROR',
			'Konto Oszczędnościowe',
			'Konto VAT',
			'Kart Kredytowa',
			'Lokata',
			'Kredyt Hipoteczny',
			'Gotówka',
			'Inwestycje kapitałowe',
			'Nieruchomości',
			'Pożyczka',
			'Podatki',
		],
	},
};

/**
 * Zwraca wartość equityType dla grupy 'bank'
 */

const bankEquityTypes = () => {
	const idxs = getValueIdxes(accounts.equityType, 'group', 'bank');
	return accounts.equityType.id.filter((id, i) => idxs.includes(i));
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
		range: 'A2:AA',
	},
};

export const { dbAdmin } = setup;
export { bankEquityTypes };
export { templates };
export { setup };
