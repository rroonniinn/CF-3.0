/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { getAccountSetupSheetName } from '../config/_config';
import { normalizeStr } from '../../lib/str/normalizeStr';
import { getSheet } from '../../lib/gas/getSheet';
import { paste } from '../../lib/gas/paste';
import { getHyperlinkSheet } from '../../lib/gas/getHyperlinkSheet';

/**
 * Wprowadza do interfasu:
 * * informację o datach utworzenia pliku oraz zakresów sald.
 * * linki do plików poszczególnych kont
 * * wysokości aktualnych sald
 *
 * @param {object} props Obiekt pripsów dla kont
 */

const updateAccountScreen = props => {
	/**
	 * Pobierz zawartość interfejsu
	 */
	const interfaceSheet = getSheet(getAccountSetupSheetName);
	const interfaceData = interfaceSheet.getDataRange().getValues();
	interfaceData.shift();

	const {
		fileId,
		nr,
		currency,
		saldoDay,
		saldoStart,
		creationDate,
		currentSaldo,
		currentStartDate,
		currentEndDate,
	} = props;

	/**
	 * Utwórz tablicę infomrmacji
	 */
	const dataRow = [];
	const hyperlinks = [];

	interfaceData.forEach(
		([, , , accountNr, curr, saldoStartDay, saldoAmount]) => {
			const accountNorm = normalizeStr(accountNr);
			const i = nr.indexOf(accountNorm);

			if (i > -1) {
				const dataS = currentStartDate[i];
				const dataE = currentEndDate[i];

				dataRow.push([
					currency[i],
					new Date(saldoDay[i]),
					saldoStart[i],
					new Date(creationDate[i]),
					/* Obecny zaskres od (jeśli dataS jest pusta to
					ją wyświetl jak nie to zrób z niej datę) */
					dataS && new Date(dataS),
					/* Obecny zaskres do (jeśli dataE jest pusta to
					ją wyświetl jak nie to zrób z niej datę) */
					dataE && new Date(dataE),
					currentSaldo[i], // Obecne saldo
				]);
				hyperlinks.push([getHyperlinkSheet(fileId[i])]);
			} else {
				dataRow.push([
					// Waluta
					curr,
					// Dzień startowy salda
					saldoStartDay && new Date(saldoStartDay),
					saldoAmount, // Wysokość startowa salda
					'', // Data utworzenia pliku konta
					'', // Obecny zaskres od
					'', // Obecny zaskres do
					'', // Obecne saldo
				]);

				hyperlinks.push([`="--"`]);
			}
		}
	);

	/**
	 * Wklejka dat i linków do interfejsu
	 */

	paste(interfaceSheet, 'E', 2, dataRow);
	interfaceSheet
		.getRange(2, 12, hyperlinks.length, 1)
		.setFormulas(hyperlinks);
};

export { updateAccountScreen };
