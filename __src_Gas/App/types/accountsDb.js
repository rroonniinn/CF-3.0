/* eslint-disable max-len */

/**
 * Values for Accounts DB accountType
 * @typedef {'asset'|'liability'} accountType
 */

/**
 * Values for Accounts DB equityType
 * @typedef {'cash'|'bankAccountStand'|'bankAccountSave'|'bankAccountVat'|'bankCreditCard'|'bankDeposit'|'capitalInvestment'|'realEstate'|'loan'|'mortgage'|'taxes'} equityType
 */

/**
 * Values for Accounts DB bank
 * @typedef {'citi'|'deutsche'|'getin'|'ing'|'mbank'|'millenium'|'pekao'|'santander'|'idea'|'nest'} bank
 */

/**
 * Values for Accounts DB currency
 * @typedef {'pln'|'thb'|'usd'|'eur'|'chf'} currency
 */

/**
 * Values for Accounts DB updateMode
 * @typedef {'csv'|'manual'|'saldo'|'auto'} updateMode
 */

/**
 * Data structure for Accounts DB
 * @typedef {Object} accountsDb
 * @property {string[]} [fileId] File ID for account files - automatically
 * @property {Date[]} [fileCreationDate] Info, when account file was created - automatically
 * @property {Date[]} [fileUpdateDate] Info, when account file was modified (including data) - automatically
 * @property {Date[]} [saldoStartDay] - automatically
 * @property {Date[]} [dateOldest] - automatically
 * @property {Date[]} [dateCurrent] - automatically
 * @property {Date[]} [interestRatePeriodFrom] - manual
 * @property {Date[]} [interestRatePeriodTo] - manual
 * @property {number[]} [saldoStartValue] - automatically
 * @property {number[]} [saldoCurrent] - automatically
 * @property {number[]} [saldoOldest] - automatically
 * @property {number[]} [transIdMin] - automatically
 * @property {number[]} [transIdMax] - automatically
 * @property {number[]} [transAllNum] - Number of all transactions in the account - automatically
 * @property {number[]} [transUncategorizedNum] - Number of all uncategorized transactions in the account - automatically
 * @property {number[]} [interestRate] - manual
 * @property {accountType[]} [accountType] - manual during setup
 * @property {equityType[]} [equityType] - manual during setup
 * @property {currency[]} [currency] - manual during setup
 * @property {bank[]} [bank] - manual during setup
 * @property {updateMode[]} [updateMode] - manual
 * @property {string[]} [bankAccountNumber] - manual during setup (have to be string)
 * @property {string[]} [displayName] - manual (modifiable)
 * @property {string[]} [userCategory] - manual
 * @property {string[]} [cardNumbers] - manual
 * @property {boolean[]} [isRemovable] - Info, is file legible to delete - automatically
 * @property {boolean[]} [isArchived]
 */

export {};
