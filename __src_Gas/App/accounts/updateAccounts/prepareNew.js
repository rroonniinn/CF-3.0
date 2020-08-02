import { templates, setup } from '../../config/_config';
import { normalizeStr } from '../../../../../../00. My Library/v02/str/normalizeStr';
import { getRandomStr } from '../../../../../../00. My Library/v02/str/getRandomStr';
import { copyFile } from '../../../../../../00. My Library/v02/gas/copyFile';
import { isEmpty } from '../../../../../../00. My Library/v02/utils/isEmpty';

const accountFileName = val => (val ? normalizeStr(val) : getRandomStr(8));

/**
 * Transfer data taken from dbAdmin (for new accounts)
 * into new db with additional info.
 * Create new files for new accounts.
 * @param {Object<string, array>} db DataBase
 * @returns {Object<string, array>|null} db DataBase
 */

const now = new Date();
const prepareNew = db => {
	const res = db.fileId
		.map((cell, i) => (cell ? null : i))
		.filter(i => i !== null)
		.map(i => ({
			// red
			i,
			fileId: copyFile(
				templates.account.url,
				accountFileName(db.bankAccountNumber[i]),
				setup.dbFolder.url
			).getId(),
			fileCreationDate: now,
			fileUpdateDate: now,
			saldoStartDay: null,
			saldoStartValue: null,
			saldoCurrent: null,
			saldoOldest: null,
			dateOldest: null,
			dateCurrent: null,
			transIdMin: null,
			transIdMax: null,
			transAllNum: 0,
			transUncategorizedNum: 0,
			isRemovable: true,
			// yellow
			accountType: db.accountType[i],
			equityType: db.equityType[i],
			currency: db.currency[i],
			bank: db.bank[i],
			bankAccountNumber: db.bankAccountNumber[i],
			// green
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

export { prepareNew };
