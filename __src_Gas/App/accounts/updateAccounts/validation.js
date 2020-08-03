import { bankEquityTypes } from '../../config/_config';
import { areValuesUnique } from '../../../../../../00. My Library/v02/arr/areValuesUnique';
import { pipe } from '../../../../../../00. My Library/v02/fp/pipe';
import { disp } from '../../../../../../00. My Library/v01/gas/disp';

/**
 * @typedef {import('./../../types/accountsDb').accountsDb} accountsDb
 */

/**
 * Values for Accounts DB bank
 * @typedef {Object} Satchel
 * @property {*} value Wrapped value
 * @property {string[]} errors Errors messages
 */

/**
 * Wrap value into object with error key. Its purpose is to attache
 * multiple potential errors infos to checked value
 * @param {*} value
 * @returns {Satchel}
 */
const attachSatchel = value => ({ value, errors: [] });

/**
 * Checks if required columns have all fields filled.
 * If not, puts appropriate info about columns with missing values
 * into 'error' key
 * @param {array} mandatoryKeys
 * @returns {(satchel: Satchel) => Satchel}
 */

const mandatoryCheck = mandatoryKeys => satchel => {
	mandatoryKeys
		.map(key =>
			satchel.value[key].some(cell => cell === '') ? key : false
		)
		.filter(errorKey => errorKey)
		.forEach(errorKey =>
			satchel.errors.push(`Values in "${errorKey}" are mandatory!`)
		);

	return satchel;
};

/**
 * Checks if required columns have only unique values
 * If not, puts into 'error' key appropriate info
 * about columns with duplicated values
 * @param {array} uniqueKeys
 * @returns {(satchel: Satchel) => Satchel}
 */

const uniqnessCheck = uniqueKeys => satchel => {
	uniqueKeys
		.map(key => (areValuesUnique(satchel.value[key]) ? false : key))
		.filter(errorKey => errorKey)
		.forEach(errorKey =>
			satchel.errors.push(`Values in "${errorKey}" are not unique!`)
		);

	return satchel;
};

/**
 * Check if columns containing equityType = bank have all cells filled
 * If not, puts into 'error' key appropriate info
 * about columns with duplicated values
 * @param {array} mandatoryKeys
 * @returns {(satchel: Satchel) => Satchel}
 */

const mandatoryBankCheck = mandatoryKeys => satchel => {
	const bankIndexes = satchel.value.equityType
		.map((val, i) => (bankEquityTypes().includes(val) ? i : false))
		.filter(vals => vals);

	mandatoryKeys
		.map(key =>
			satchel.value[key].filter((val, i) =>
				// empty val is false too
				bankIndexes.includes(i) ? val : false
			).length !== bankIndexes.length
				? key
				: false
		)
		.filter(errorKey => errorKey)
		.forEach(errorKey =>
			satchel.errors.push(
				`Values related to bank in "${errorKey}" is missing`
			)
		);

	return satchel;
};

/**
 * Validation Success function
 * @callback validationSuccess
 * @param {accountsDb} db
 */
/**
 * Validation Failure function
 * @callback validationFailure
 * @param {array} error messages
 */

/**
 * Particular validation stack
 * @param {validationSuccess} success
 * @param {validationFailure} failure
 * @returns {(db: accountsDb) => *}
 */
const vaidateDb = (success, failure) => db =>
	pipe(
		attachSatchel,
		mandatoryCheck([
			'accountType',
			'equityType',
			'currency',
			'displayName',
			'updateMode',
		]),
		mandatoryBankCheck(['bank', 'bankAccountNumber']),
		uniqnessCheck(['displayName', 'bankAccountNumber']),
		satchel =>
			satchel.errors.length
				? failure(satchel.errors)
				: success(satchel.value)
	)(db);

/**
 * Validation error handling
 */

const validationFailed = v => disp(`Errors: ${v.length}. ${v}`);

export { validationFailed, vaidateDb };
