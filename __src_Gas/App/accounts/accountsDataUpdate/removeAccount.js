import {
	getProps,
	setProps,
} from '../../../../../../00. My Library/v02/gas/properties';
import { getSheet } from '../../../../../../00. My Library/v02/gas/getSheet';

import { getFile } from '../../../../../../00. My Library/v02/gas/getFile';
import { dbAdmin } from '../../config/_config';
import { paste } from '../../../../../../00. My Library/v02/gas/paste';
import { dbIntoArr } from '../../../../../../00. My Library/v02/db/dbIntoArr';
import { removeRecordFromDb } from '../../../../../../00. My Library/v02/db/removeRecordFromDb';

const removePrompt = `Podaj fileId konta do usunięcia.
UWAGA: Konto nie zostanie usunięte z systemu, jeśli transakcje z niego
występują na wyciągach innych kont. W takim przypdaku, zostanie ono
oznaczone jako archiwalne

`;

const ui = SpreadsheetApp.getUi();

const dataInit = () => {
	const props = getProps('accounts');
	const sheet = getSheet(dbAdmin.sheet, dbAdmin.ulr);
	const userData = sheet.getRange(dbAdmin.range).getValues();
	const dbKeysOrder = userData.slice(0, 1)[0];

	return { props, sheet, userData, dbKeysOrder };
};

const removeGivenKey = (key, { props, sheet, dbKeysOrder }) => {
	const index = props.fileId.indexOf(key);

	if (index === -1) {
		ui.alert(`Key "${key}" DOES NOT EXIST!`);
		return;
	}

	if (props.isRemovable[index] === false) {
		props.isArchived[index] = true;
		setProps('accounts', props);
		paste(sheet, 'A2', dbIntoArr(dbKeysOrder, props), {
			notRemoveFilers: true,
			notRemoveEmptys: true,
		});
		ui.alert(`Account "${key}" is not removable. Changed to archived`);
		return;
	}

	removeRecordFromDb(index, props);
	getFile(key).setTrashed(true);
	setProps('accounts', props);
	paste(sheet, 'A2', dbIntoArr(dbKeysOrder, props), {
		notRemoveFilers: true,
		notRemoveEmptys: true,
	});

	ui.alert(`Account "${key}" and asociated file were removed`);
};

const removeAccount = () => {
	const result = ui.prompt(removePrompt, ui.ButtonSet.OK_CANCEL);
	const button = result.getSelectedButton();
	const fileIdToDelete = result.getResponseText();

	if (button === ui.Button.OK) {
		removeGivenKey(fileIdToDelete, dataInit());
	}
};

export { removeAccount };
