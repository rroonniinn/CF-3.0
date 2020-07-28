/* eslint-disable max-params */
import { getSheet } from '../../../lib/gas/getSheet';
import { logsSheetName } from '../../config/_config';
/**
 * Loguje dane do arkusza logów
 *
 * @param {string} element Czego dotyczy
 * @param {string} shortInfo Krótkie info
 * @param {string} longInfo Dłuższy opis
 * @param {number} status O 1 do 3, gdzie 3 to krytyczny problem
 */
const logger = (element, shortInfo, longInfo, status) => {
	const sheet = getSheet(logsSheetName);
	const row = [new Date(), element, shortInfo, longInfo, status];

	sheet.insertRowBefore(2);
	sheet.getRange('A2:E2').setValues([row]);
};

export { logger };
