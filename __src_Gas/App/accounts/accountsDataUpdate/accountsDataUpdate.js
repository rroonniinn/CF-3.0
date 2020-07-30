import { pipe } from '../../../../../../00. My Library/v02/fp/pipe';
import { turnArrIntoDb } from '../../../../../../00. My Library/v02/arr/turnArrIntoDb';
import { rowNotEmpty } from '../../../../../../00. My Library/v02/arr/rowNotEmpty';

import { dataInit } from './dataInit';
import { updateInit } from './updateInit';
import { validationFailed, vaidateDb } from './validation';

const accountsDataUpdate = () => {
	const initD = dataInit();

	pipe(
		data => data.filter(rowNotEmpty),
		turnArrIntoDb,
		vaidateDb(updateInit(initD), validationFailed)
	)(initD.userData);
};

export { accountsDataUpdate };
