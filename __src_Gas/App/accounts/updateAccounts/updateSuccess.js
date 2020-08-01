/* eslint-disable max-params */
/* eslint-disable complexity */
import { toast } from '../../../../../../00. My Library/v02/gas-ui/toast';

import { applyChanges } from './applyChanges';
import { prepareDb } from './prepareDb';
import { successMsg } from './successMsg';

const updateSuccess = (propDb, existingDb, newDb, sheet, dbKeysOrder) => {
	if (!(propDb || existingDb) && newDb) {
		applyChanges(sheet, newDb, dbKeysOrder);
		toast(successMsg(existingDb, newDb));
		return;
	}

	if (propDb && existingDb) {
		const updatedProps = prepareDb(propDb);
		existingDb.fileId.forEach(id => {
			const i = updatedProps.fileId.indexOf(id);
			Object.keys(existingDb).forEach(
				key => (updatedProps[key][i] = existingDb[key][i])
			);
		});

		if (newDb) {
			newDb.fileId.forEach((id, i) => {
				Object.keys(newDb).forEach(key =>
					updatedProps[key].push(newDb[key][i])
				);
			});
		}

		applyChanges(sheet, updatedProps, dbKeysOrder);
		toast(successMsg(existingDb, newDb));
	}
};

export { updateSuccess };
