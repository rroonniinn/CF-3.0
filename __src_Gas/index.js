import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

import { accountsDataUpdate } from './App/accounts/accountsDataUpdate/accountsDataUpdate';
import { removeAccount } from './App/accounts/accountsDataUpdate/removeAccount';

// @ts-ignore
global.pub = {
	tests: () => {},
	accountsDataUpdate,
	removeAccount,
};

const menuRegular = [
	['Aktualizuj konta', 'pub.accountsDataUpdate'],
	['Usuń wybrane konto', 'pub.removeAccount'],
];

const menuDev = [['Update menu', 'onOpen']];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuRegular, 'ICON', true);
	setMenu(menuDev, 'DEV', true);
};
