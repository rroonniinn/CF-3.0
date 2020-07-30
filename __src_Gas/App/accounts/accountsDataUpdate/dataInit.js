import { getProps } from '../../../../../../00. My Library/v02/gas/properties';
import { getSheet } from '../../../../../../00. My Library/v02/gas/getSheet';
import { dbAdmin } from '../../config/_config';

const dataInit = () => {
	const props = getProps('accounts');
	const sheet = getSheet(dbAdmin.sheet, dbAdmin.ulr);
	const userData = sheet.getRange(dbAdmin.range).getValues();
	const dbKeysOrder = userData.slice(0, 1)[0];

	return { props, sheet, userData, dbKeysOrder };
};

export { dataInit };
