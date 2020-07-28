const menuDev = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('DEV')
		.addItem('Wyczyść ekran logów', 'devManu.cleanLogsScreen')
		.addSeparator()
		.addItem(
			'Aktualizuj ekran kont',
			'devManu.manualyUpdateAccountScreen'
		)
		.addSeparator()
		.addItem('Backup Propsy', 'accountPropsBackup')
		.addSeparator()
		.addItem('Test', 'test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menuDev };
