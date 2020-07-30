import { getProps } from '../../../../../../00. My Library/v02/gas/properties';
import { getSheet } from '../../../../../../00. My Library/v02/gas/getSheet';
import { dbAdmin } from '../../config/_config';

const correctDates = props => {
	props.fileCreationDate = props.fileCreationDate.map(
		val => new Date(val)
	);
	return props;
};

const dataInit = () => {
	const props = correctDates(getProps('accounts'));
	const sheet = getSheet(dbAdmin.sheet, dbAdmin.ulr);
	const userData = sheet.getRange(dbAdmin.range).getValues();
	const dbKeysOrder = userData.slice(0, 1)[0];

	return { props, sheet, userData, dbKeysOrder };
};

const checkData = () => {
	const res = dataInit().props.fileCreationDate.map(val => ({
		val,
		date: new Date(val),
	}));

	console.log(res);
};

export { dataInit, checkData };
