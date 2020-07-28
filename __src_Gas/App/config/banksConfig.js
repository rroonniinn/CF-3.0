/* eslint-disable no-throw-literal */

const csvConf = {
	delimiter: {
		mbank: ';',
		santander: ',',
		ing: ';',
		millenium: ',',
	},
	charset: {
		mbank: 'Windows-1250',
		santander: 'utf-8',
		ing: 'Windows-1250',
		millenium: 'utf-8',
	},
	other: {
		// banki z więcej niż jednym kontem na wyciągu
		mutiples: ['millenium'],
	},
};
/**
 * Zaraca odpowiednią wartość configa
 *
 * @param {string} category Jedna z watrości: delimiter, charset, parserLib
 * @param {string} bankName Nazwa banku (małymi literami bez spacji)
 */
const getValue = (category, bankName) => {
	if (!csvConf[category])
		throw `Brak takiej kategorii w configu: ${category}`;
	if (!csvConf[category][bankName])
		throw `Brak takiego banku w configu: ${bankName}`;
	return csvConf[category][bankName];
};

export { getValue };
