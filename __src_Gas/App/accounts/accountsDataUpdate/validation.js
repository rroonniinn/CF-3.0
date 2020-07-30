import { areValuesUniqe } from '../../../../../../00. My Library/v02/arr/areValuesUniqe';
import { bankEquityTypes } from '../../config/_config';
import { pipe } from '../../../../../../00. My Library/v02/fp/pipe';
import { disp } from '../../../../../../00. My Library/v01/gas/disp';

const attachSatchel = value => ({ value, errors: [] });

/**
 * Sprawdza czy wymagane pola są wypełnione.
 * Jeśli nie to doczepia do otrzymanego obiektu w kluczu "error"
 * info które kolumny nie są wypełnione
 *
 * @param {array} mandatoryKeys
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
 * Sprawdza w określonych komunach wartości są unikatowe.
 * Jeśli nie to doczepia do otrzymanego obiektu w kluczu "error"
 * info które kolumny mają powtarzające sie dane
 *
 * @param {array} uniqueKeys
 */

const uniqnessCheck = uniqueKeys => satchel => {
	uniqueKeys
		.map(key => (areValuesUniqe(satchel.value[key]) ? false : key))
		.filter(errorKey => errorKey)
		.forEach(errorKey =>
			satchel.errors.push(`Values in "${errorKey}" are not unique!`)
		);

	return satchel;
};

/**
 * Sprawdza czy dla equityType = bank wszystkie wymagane kolumny
 * są wypełnione. Jeśli nie to doczepia do otrzymanego obiektu
 * w kluczu "error"
 * info które kolumny nie są wypełnione
 *
 * @param {array} mandatoryKeys
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
 * Pełna walidacja danych. Oczekuje obiektu typu 'db'
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
 * Obsługa błędu walidacji
 */

const validationFailed = v => disp(`Errors: ${v.length}. ${v}`);

export { validationFailed, vaidateDb };
