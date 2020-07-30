/* eslint-disable complexity */
import { isEmpty } from '../../../../../../00. My Library/v02/utils/isEmpty';
import { setProps } from '../../../../../../00. My Library/v02/gas/properties';
import { paste } from '../../../../../../00. My Library/v02/gas/paste';
import { dbIntoArr } from '../../../../../../00. My Library/v02/db/dbIntoArr';

import { updateExisting } from './updateExisting';
import { updateNew } from './updateNew';

const updateInit = ({ props, sheet, dbKeysOrder }) => db => {
	const newAccounts = updateNew(db);
	const existingAccounts = updateExisting(db);

	/* eslint-disable */
	// Wywala się rollup na wyrażeniu const updatedProps = {...props}
	const updatedProps = Object.assign({}, props );
	/* eslint-enable */

	if (!props && isEmpty(existingAccounts)) {
		setProps('accounts', newAccounts);
		paste(sheet, 'A2', dbIntoArr(dbKeysOrder, newAccounts), {
			notRemoveFilers: true,
			notRemoveEmptys: true,
		});
	} else {
		existingAccounts.fileId.forEach(id => {
			const i = updatedProps.fileId.indexOf(id);
			Object.keys(existingAccounts).forEach(
				key => (updatedProps[key][i] = existingAccounts[key][i])
			);
		});

		if (!isEmpty(newAccounts)) {
			newAccounts.fileId.forEach((id, i) => {
				Object.keys(newAccounts).forEach(key =>
					updatedProps[key].push(newAccounts[key][i])
				);
			});
		}

		setProps('accounts', updatedProps);
		paste(sheet, 'A2', dbIntoArr(dbKeysOrder, updatedProps), {
			notRemoveFilers: true,
			notRemoveEmptys: true,
		});
	}
};

export { updateInit };

/**
 * index obecny w propsach, ale nie obecny w existingAccounts
 * oznacza wpis do usunięcia:
 * - jeśli klucz 'removable' jest na true to można go usunąć
 * - jeśli klucz 'removable' jest na false to zamias usunięcia
 *   klucz 'isArchives' jest ustawiany na true
 */
