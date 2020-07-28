import { getSheet } from '../../lib/gas/getSheet';
import { getIdFromUrl } from '../../lib/gas/getIdFromUrl';
import { getValues } from '../../lib/gas/getValues';

/**
 * Zwraca ID folderu na podstawie adresu URL wpisanego
 * w podanej komórce arkusza (sheet i range)
 *
 * @memberof Lib_Conf
 * @instance
 *
 * @param {string} sheetName Nazwa arkusza w którym znajduje się komórka z URL-em
 * @param {string} range Zakres (jedna komórka) w której znajduje się URL
 * @returns {string} ID folderu
 */

const getFolderId = (sheetName, range) => {
	const sheetObj = getSheet(sheetName);
	return getIdFromUrl(getValues(sheetObj, range).toString());
};

export { getFolderId };
