// eslint-disable-next-line max-lines-per-function
const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Konta')
				.addItem(
					'Dodaj nowe konta do systemu',
					'menu.createAccounts'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Wyciągi')
				.addItem(
					'Przenieś dane z wyciągów do kont',
					'menu.transferDataCsvToAccounts'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Gotówka')
				.addItem(
					'Przenieś transakcje gotówkowe do własnych plików',
					'menu.moveCashFromAccounts'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Transakcje')
				.addItem(
					'Kategoryzuj Transakcje (wybrane konto)',
					'menu.categoriseOneAccount'
				)
				.addItem(
					'Kategoryzuj Transakcje (wszystkie konta)',
					'menu.categoriseAllAccounts'
				)
				.addSeparator()
				.addItem(
					'Rekategoryzuj (wybrane konto)',
					'menu.recategoriseOneAccount'
				)
				.addItem(
					'Rekategoryzuj (wszystkie konta)',
					'menu.recategoriseAllAccount'
				)
		)
		.addToUi();
};

export { menu };

/* Examples */

// var gui = SpreadsheetApp.getUi();

// function onOpen(e) {
// 	gui.createMenu('Nazwa menu')
// 		.addItem('Nazwa pozycji w menu', 'myFunction')
// 		.addSeparator()
// 		.addSubMenu(
// 			gui
// 				.createMenu('My sub-menu')
// 				.addItem('One sub-menu item', 'mySecondFunction')
// 				.addItem('Another sub-menu item', 'myThirdFunction')
// 		)
// 		.addToUi();
// }
