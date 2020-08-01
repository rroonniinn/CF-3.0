import { setProps } from '../../../../../../00. My Library/v02/gas/properties';
import { paste } from '../../../../../../00. My Library/v02/gas/paste';
import { dbIntoArr } from '../../../../../../00. My Library/v02/db/dbIntoArr';

/**
 * Updates props db and dbAdmin with latest data
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet Target
 * @param {*} db
 * @param {array} dbKeysOrder
 */
const applyChanges = (sheet, db, dbKeysOrder) => {
	setProps('accounts', db);
	paste(sheet, 'A2', dbIntoArr(dbKeysOrder, db), {
		notRemoveFilers: true,
		notRemoveEmptys: true,
	});
};

export { applyChanges };
