import { deepCopy } from '../../../../../../00. My Library/v02/obj/deepCopy';
import { isEmpty } from '../../../../../../00. My Library/v02/utils/isEmpty';

/**
 * Correct db taken from props:
 * 1. Changing dates from strings to Data Objects
 * 2. Check whether props have only empty values.
 *		It happens when you delete all, previously existing accounts
 *
 * @param {Object<string, any>} propsDb db taken from props
 * @returns {Object<string, any>}
 */
const prepareDb = propsDb => {
	if (!propsDb) return null;
	if (isEmpty(propsDb.fileId)) return null;

	const newDb = deepCopy(propsDb);
	newDb.fileCreationDate = newDb.fileCreationDate.map(
		val => new Date(val)
	);

	return newDb;
};

export { prepareDb };
