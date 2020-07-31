import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

import { accountsDataUpdate } from './App/accounts/accountsDataUpdate/accountsDataUpdate';
import { removeAccount } from './App/accounts/accountsDataUpdate/removeAccount';
import { getAccountsProps } from './App/dev/getAccountsProps';
import { dataInit } from './App/accounts/accountsDataUpdate/dataInit';

// @ts-ignore
global.pub = {
	tests: () => {},
	accountsDataUpdate,
	removeAccount,
	getAccountsProps,
};

// @ts-ignore
global.test = {
	propsAfterPrepare: () => console.log(dataInit().props),
};

const menuRegular = [
	['Aktualizuj konta', 'pub.accountsDataUpdate'],
	'---------------',
	['Usuń wybrane konto', 'pub.removeAccount'],
];

const menuDev = [
	['Console log Props Accounts', 'pub.getAccountsProps'],
	['Console log Props Accounts after prepare', 'test.propsAfterPrepare'],
	'---------------',
	['Update menu', 'onOpen'],
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuRegular, 'ICON', true);
	setMenu(menuDev, 'DEV', true);
};
