/* eslint-disable max-len */
import { isEmpty } from '../../../../../../00. My Library/v02/utils/isEmpty';

/**
 * @typedef {import('./../../types/accountsDb').accountsDb} accountsDb
 */

/**
 * Transfer data taken from dbAdmin (for existing accounts)
 * into new db with additional info
 * @param {accountsDb} db DataBase
 * @returns {accountsDb|null}
 */

const prepareExisting = db => {
	const res = db.fileId
		.map((cell, i) => (cell ? i : null))
		.filter(i => i !== null)
		.map(i => ({
			i,
			fileId: db.fileId[i],
			displayName: db.displayName[i],
			updateMode: db.updateMode[i],
			userCategory: db.userCategory[i],
			cardNumbers: db.cardNumbers[i],
			interestRate: db.interestRate[i],
			interestRatePeriodFrom: db.interestRatePeriodFrom[i],
			interestRatePeriodTo: db.interestRatePeriodTo[i],
			isArchived: db.isArchived[i],
		}))
		.reduce((newDb, newFilesObj) => {
			Object.entries(newFilesObj).forEach(([key, val]) =>
				newDb[key] ? newDb[key].push(val) : (newDb[key] = [val])
			);
			return newDb;
		}, {});

	return isEmpty(res) ? null : res;
};

export { prepareExisting };
