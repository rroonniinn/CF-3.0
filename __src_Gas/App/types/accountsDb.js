/**
 * Data structure for Accounts DB
 * @typedef {Object} accountsDb
 * @property {string[]} fileId
 * @property {Date[]} fileCreationDate
 * @property {Date[]} fileUpdateDate
 * @property {Date[]} saldoStartDay
 * @property {number[]} saldoStartValue
 * @property {number[]} saldoCurrent
 * @property {number[]} saldoOldest
 * @property {Date[]} dateOldest
 * @property {Date[]} dateCurrent
 * @property {number[]} transIdMin
 * @property {number[]} transIdMax
 * @property {number[]} transAllNum
 * @property {number[]} transUncategorizedNum
 * @property {boolean[]} isRemovable
 * @property {string[]} accountType / można by to doszczegółowić
 * @property {string[]} equityType
 * @property {string[]} currency
 * @property {string[]} bank
 * @property {string[]} bankAccountNumber
 * @property {string[]} displayName
 * @property {string[]} updateMode
 * @property {string[]} userCategory
 * @property {string[]} cardNumbers
 * @property {number[]} interestRate
 * @property {Date[]} interestRatePeriodFrom
 * @property {Date[]} interestRatePeriodTo
 * @property {boolean[]} isArchived
 */

/**
 * To jest super obiekt na bazie custom types
 * @type {accountsDb} obj
 */
const obj = {
	fileId: ['1', '2', '3'],
	fileCreationDate: [new Date(), new Date()],
	fileUpdateDate: [],
	saldoStartDay: [],
	saldoStartValue: [],
	saldoCurrent: [],
	saldoOldest: [],
	dateOldest: [],
	dateCurrent: [],
	transIdMin: [],
	transIdMax: [],
	transAllNum: [],
	transUncategorizedNum: [],
	isRemovable: [true],
	accountType: [],
	equityType: [],
	currency: [],
	bank: [],
	bankAccountNumber: [],
	displayName: [],
	updateMode: [],
	userCategory: [],
	cardNumbers: [],
	interestRate: [],
	interestRatePeriodFrom: [],
	interestRatePeriodTo: [],
	isArchived: [],
};
