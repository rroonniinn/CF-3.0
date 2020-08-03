import { setProps } from '../../../../../../00. My Library/v02/gas/properties';
import { paste } from '../../../../../../00. My Library/v02/gas/paste';
import { dbIntoArr } from '../../../../../../00. My Library/v02/db/dbIntoArr';
import { dbAdmin } from '../../config/_config';

/**
 * @typedef {import('./../../types/accountsDb').accountsDb} accountsDb
 */

/**
 * Updates props db and dbAdmin with latest data
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet Target
 * @param {accountsDb} db
 * @param {array} dbKeysOrder
 */
const applyChanges = (sheet, db, dbKeysOrder) => {
	setProps('accounts', db);
	paste(sheet, dbAdmin.range, dbIntoArr(dbKeysOrder, db), {
		notRemoveFilers: true,
		notRemoveEmptys: true,
	})
		.getRange(dbAdmin.updateDate)
		.setValue(new Date());
};

export { applyChanges };
