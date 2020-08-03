/* eslint-disable complexity */

/**
 * @typedef {import('./../../types/accountsDb').accountsDb} accountsDb
 */

const getMsg = (holder, len, prefix) => {
	if (len === 1) {
		holder.push(`${prefix} 1 konto.`);
	} else if (len > 1 && len < 5) {
		holder.push(`${prefix} ${len} konta.`);
	} else {
		holder.push(`${prefix} ${len} kont.`);
	}
};

/**
 * Return appropriate success message used after account were
 * added or updated
 * @param {accountsDb} existingA db for existing accounts
 * @param {accountsDb} newA db for new accounts
 * @returns {string} Message
 */

const successMsg = (existingA, newA) => {
	const msg = [];

	if (existingA) getMsg(msg, existingA.fileId.length, 'Zaktualizowano');
	if (newA) getMsg(msg, newA.fileId.length, 'Dodano');

	return msg.join(' ');
};

export { successMsg };
