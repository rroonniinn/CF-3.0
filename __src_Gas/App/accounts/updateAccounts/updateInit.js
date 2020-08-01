/* eslint-disable no-irregular-whitespace */
/* eslint-disable complexity */

import { toast } from '../../../../../../00. My Library/v02/gas-ui/toast';

import { applyChanges } from './applyChanges';
import { prepareExisting } from './prepareExisting';
import { prepareNew } from './prepareNew';
import { updateSuccess } from './updateSuccess';

const updateInit = ({ props, sheet, dbKeysOrder }) => db => {
	const existAccounts = prepareExisting(db);

	// Errors handling - manually deleted filedIds or whole rows:

	if (props && !existAccounts) {
		toast(
			`Ups. Wszystkie wpisy (lub ich fileId) istniejących kont zostały ręcznie usunięte.
			Stan właściwy został przywrócony.`
		);
		applyChanges(sheet, props, dbKeysOrder);
		return;
	}

	if (props && props.fileId.length !== existAccounts.fileId.length) {
		toast(`Dla części istniejących kont zostały ręcznie usunięte fileId!
		Stan właściwy został przywrócony, ale jeśli próbowano wprowadzić nowe konta,
		ich zapisy zostały usunięte. Dodaj je raz jeszcze.`);
		applyChanges(sheet, props, dbKeysOrder);
		return;
	}

	// Don't move this line up or down - this order is crucial
	const newAccounts = prepareNew(db);

	// Other errors handling:

	if (!(props || existAccounts || newAccounts)) {
		toast('Nie mam nic do dodania - wprowadź jakieś dane');
		return;
	}

	if (existAccounts && newAccounts && !props) {
		toast(
			`Nic nie dodane. fileId dla części nowych kont zostało wprowadzone ręcznie!
			Proszę usunąć wpisy dla fileId`
		);
		return;
	}

	if (!(props || newAccounts) && existAccounts) {
		toast(
			`Nic nie dodane. fileId dla nowych kont zostało wprowadzone ręcznie!
			Proszę usunąć wpisy dla fileId`
		);
		return;
	}

	// Success operations:
	updateSuccess(props, existAccounts, newAccounts, sheet, dbKeysOrder);
};

export { updateInit };
