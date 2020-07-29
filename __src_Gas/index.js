import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

import { updateAccounts } from './App/accounts/updateAccounts';

// @ts-ignore
global.pub = {
	tests: () => {},
	updateAccounts,
};

const menuRegular = [['Aktualizuj konta', 'pub.updateAccounts']];

const menuDev = [['Update menu', 'onOpen']];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuRegular, 'ICON', true);
	setMenu(menuDev, 'DEV', true);
};
