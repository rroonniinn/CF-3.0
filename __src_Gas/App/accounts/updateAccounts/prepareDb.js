import { deepCopy } from '../../../../../../00. My Library/v02/obj/deepCopy';
import { isEmpty } from '../../../../../../00. My Library/v02/utils/isEmpty';

/**
 * @typedef {import('./../../types/accountsDb').accountsDb} accountsDb
 */

/**
 * Corrects date to date Objects
 * @param {accountsDb} db
 * @param {array} dateKeys
 * @returns {accountsDb} db
 */
const correctDates = (db, dateKeys) => {
	const newDb = deepCopy(db);
	dateKeys.forEach(key => {
		newDb[key] = newDb[key].map(v => (v ? new Date(v) : v));
	});
	return newDb;
};

/**
 * Correct db taken from props:
 * 1. Changing dates from strings to Data Objects
 * 2. Check whether props have only empty values - It happens when you
 * delete all, previously existing accounts
 *
 * @param {accountsDb} propsDb db taken from props
 * @returns {accountsDb}
 */
const prepareDb = propsDb => {
	if (!propsDb) return null;
	if (isEmpty(propsDb.fileId)) return null;

	return correctDates(propsDb, [
		'fileCreationDate',
		'fileUpdateDate',
		'saldoStartDay',
		'dateOldest',
		'dateCurrent',
	]);
};

export { prepareDb };
