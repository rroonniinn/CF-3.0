import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

import { getAccountsProps } from './App/dev/getAccountsProps';
import { dataInit } from './App/accounts/updateAccounts/dataInit';
import { removeAccount } from './App/accounts/updateAccounts/removeAccount';
import { updateAccounts } from './App/accounts/updateAccounts/updateAccounts';

// @ts-ignore
global.pub = {
	tests: () => {},
	updateAccounts,
	removeAccount,
	getAccountsProps,
};

// @ts-ignore
global.test = {
	propsAfterPrepare: () => console.log(dataInit().props),
};

const menuRegular = [
	['Aktualizuj konta', 'pub.updateAccounts'],
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
