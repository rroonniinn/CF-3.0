import { normalizeStr } from '../../../../../../00. My Library/v02/str/normalizeStr';
import { getRandomStr } from '../../../../../../00. My Library/v02/str/getRandomStr';
import { copyFile } from '../../../../../../00. My Library/v02/gas/copyFile';
import { templates, setup } from '../../config/_config';

const accountFileName = val => (val ? normalizeStr(val) : getRandomStr(8));

const updateNew = db =>
	db.fileId
		.map((cell, i) => (cell ? null : i))
		.filter(i => i !== null)
		.map(i => ({
			i,
			// fileId: accountFileName(obj.bankAccountNumber[i]),
			fileId: copyFile(
				templates.account.url,
				accountFileName(db.bankAccountNumber[i]),
				setup.dbFolder.url
			).getId(),
			fileCreationDate: new Date(),
			accountType: db.accountType[i],
			equityType: db.equityType[i],
			currency: db.currency[i],
			bank: db.bank[i],
			bankAccountNumber: db.bankAccountNumber[i],
			displayName: db.displayName[i],
			updateMode: db.updateMode[i],
			userCategory: db.userCategory[i],
			cardNumbers: db.cardNumbers[i],
			interestRate: db.interestRate[i],
			interestRatePeriodFrom: db.interestRatePeriodFrom[i],
			interestRatePeriodTo: db.interestRatePeriodTo[i],
			isArchived: db.isArchived[i],
			fileUpdateDate: '-',
			saldoStartDay: '-',
			saldoStartValue: '-',
			saldoCurrent: '-',
			saldoOldest: '-',
			dateOldest: '-',
			dateCurrent: '-',
			transIdMin: '-',
			transIdMax: '-',
			transTotal: '-',
			transNotCategoried: '-',
			// isRemovable: false,
			isRemovable: true,
		}))
		.reduce((newDb, newFilesObj) => {
			Object.entries(newFilesObj).forEach(([key, val]) =>
				newDb[key] ? newDb[key].push(val) : (newDb[key] = [val])
			);
			return newDb;
		}, {});

export { updateNew };
