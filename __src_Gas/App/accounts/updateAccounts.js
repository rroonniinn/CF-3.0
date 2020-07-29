/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */
import { getSheet } from '../../../../../00. My Library/v02/gas/getSheet';
import { pipe } from '../../../../../00. My Library/v02/fp/pipe';
import { tap } from '../../../../../00. My Library/v02/fp/tap';
import { paste } from '../../../../../00. My Library/v02/gas/paste';
import { normalizeStr } from '../../../../../00. My Library/v02/str/normalizeStr';
import { copyFile } from '../../../../../00. My Library/v02/gas/copyFile';
import { getRandomStr } from '../../../../../00. My Library/v02/str/getRandomStr';
import { turnArrIntoDb } from '../../../../../00. My Library/v02/arr/turnArrIntoDb';
import { dbAdmin, templates, setup } from '../config/_config';
import { crusherProps } from '../../../../../00. My Library/v02/gas/properties';
import { rowNotEmpty } from '../../../../../00. My Library/v02/arr/rowNotEmpty';
import { attachSatchel } from './satchel';
import { validateInterfaceData } from './validation';

const getProps = propName => crusherProps.get(propName);
const setProps = (propName, val) => crusherProps.put(propName, val);

const accountFileName = val => (val ? normalizeStr(val) : getRandomStr(8));

const dbIntoArr = (header, db) => {
	const newArr = [];
	db.i.forEach((val, index) => {
		const row = [];
		header[0].forEach(headerEl => {
			row.push(db[headerEl][index]);
		});
		newArr.push(row);
	});

	return header.concat(newArr);
};

const printToInterface = (header, db) => {
	const tabularData = dbIntoArr(header, db);
	paste(getSheet('res', dbAdmin.ulr), 'A2', tabularData, {
		notRemoveFilers: true,
		notRemoveEmptys: true,
	});
};

const createNewAccounts = header => obj => {
	const props = getProps('accounts');

	const newFiles = obj.fileId
		.map((cell, i) => (cell ? null : i))
		.filter(i => i !== null)
		.map(i => ({
			i,
			fileId: accountFileName(obj.bankAccountNumber[i]),

			// fileId: copyFile(
			// 	templates.account.url,
			// 	accountFileName(obj.bankAccountNumber[i]),
			// 	setup.dbFolder.url
			// ).getId(),
			fileCreationDate: new Date(),
			accountType: obj.accountType[i],
			equityType: obj.equityType[i],
			currency: obj.currency[i],
			bank: obj.bank[i],
			bankAccountNumber: obj.bankAccountNumber[i],
			displayName: obj.displayName[i],
			updateMode: obj.updateMode[i],
			userCategory: obj.userCategory[i],
			cardNumbers: obj.cardNumbers[i],
			interestRate: obj.interestRate[i],
			interestRatePeriodFrom: obj.interestRatePeriodFrom[i],
			interestRatePeriodTo: obj.interestRatePeriodTo[i],
			isArchived: obj.isArchived[i],
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
		}));

	if (!props) {
		const db = newFiles.reduce((newDb, newFileObj) => {
			Object.entries(newFileObj).forEach(([key, val]) =>
				newDb[key] ? newDb[key].push(val) : (newDb[key] = [val])
			);
			return newDb;
		}, {});

		setProps('accounts', db);

		printToInterface(header, db);

		return db;
	}
};

const updateSystem = (header, obj) =>
	pipe(
		createNewAccounts(header),
		console.log,
		() => console.log('header', header)
	)(obj);

const validationFailed = v => console.log(`Errors: ${v.length}. ${v}`);

const getValsFromDbAdmin = () => {
	const dbSheet = getSheet(dbAdmin.sheet, dbAdmin.ulr);
	const interfaceData = dbSheet.getRange(dbAdmin.range).getValues();
	const header = interfaceData.slice(0, 1);

	pipe(
		arr => arr.filter(rowNotEmpty),
		turnArrIntoDb,
		attachSatchel,
		validateInterfaceData,
		satchel =>
			satchel.errors.length
				? validationFailed(satchel.errors)
				: updateSystem(header, satchel.value)
	)(interfaceData);
};

const updateAccounts = () => {
	getValsFromDbAdmin();

	// console.log(getProps('accounts'));
};

export { updateAccounts };
