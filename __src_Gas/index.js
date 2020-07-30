import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

import { accountsDataUpdate } from './App/accounts/accountsDataUpdate/accountsDataUpdate';
import { removeAccount } from './App/accounts/accountsDataUpdate/removeAccount';
import { checkData } from './App/accounts/accountsDataUpdate/dataInit';

// @ts-ignore
global.pub = {
	tests: () => {},
	accountsDataUpdate,
	removeAccount,
	checkData,
};

const menuRegular = [
	['Sprawdź dane', 'pub.checkData'],
	'---------------',
	['Aktualizuj konta', 'pub.accountsDataUpdate'],
	['Usuń wybrane konto', 'pub.removeAccount'],
];

const menuDev = [['Update menu', 'onOpen']];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuRegular, 'ICON', true);
	setMenu(menuDev, 'DEV', true);
};
