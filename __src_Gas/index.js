import { setMenu } from '../../../00. My Library/v02/gas/setMenu';

// @ts-ignore
global.pub = {
	tests: () => {},
};

const menuRegular = [
	['Test', 'pub.tests'], // Element bez submenu
];

const menuDev = [
	['Update menu', 'onOpen'], // Element bez submenu
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuRegular, 'ICON', true);
	setMenu(menuDev, 'DEV', true);
};
