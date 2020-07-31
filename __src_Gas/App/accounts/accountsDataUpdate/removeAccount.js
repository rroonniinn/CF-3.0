import { trashFile } from '../../../../../../00. My Library/v02/gas/trashFile';
import { setValue } from '../../../../../../00. My Library/v02/db/setValue';
import { getValue } from '../../../../../../00. My Library/v02/db/getValue';
import { getValueIdx } from '../../../../../../00. My Library/v02/db/getValueIdx';
import { removeRecord } from '../../../../../../00. My Library/v02/db/removeRecord';
import { toast } from '../../../../../../00. My Library/v02/gas-ui/toast';

import { dataInit } from './dataInit';
import { unifyDataEverywhere } from './unifyDataEverywhere';

const removePrompt = `Podaj fileId konta do usunięcia.
UWAGA: Konto nie zostanie usunięte z systemu, jeśli transakcje z niego
występują na wyciągach innych kont. W takim przypdaku, zostanie ono
oznaczone jako archiwalne

`;

const ui = SpreadsheetApp.getUi();

const removeGivenKey = (fileId, { props, sheet, dbKeysOrder }) => {
	const idx = getValueIdx(props, 'fileId', fileId);

	if (idx === -1) {
		toast(`Key "${fileId}" DOES NOT EXIST!`);
		return;
	}

	if (!getValue(props, 'isRemovable', idx)) {
		unifyDataEverywhere(
			sheet,
			setValue(props, 'isArchived', idx, true),
			dbKeysOrder
		);
		toast(`Account "${fileId}" is not removable. Changed to archived`);
		return;
	}

	trashFile(fileId);
	unifyDataEverywhere(sheet, removeRecord(props, idx), dbKeysOrder);
	toast(`Account "${fileId}" and asociated file were removed`);
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
