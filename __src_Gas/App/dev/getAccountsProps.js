import { getProps } from '../../../../../00. My Library/v02/gas/properties';

const correctDates = props => {
	props.fileCreationDate = props.fileCreationDate.map(
		val => new Date(val)
	);
	return props;
};

const getAccountsProps = () => {
	console.log(correctDates(getProps('accounts')));
};

export { getAccountsProps };
