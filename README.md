# GAS.CF-Private-2.0

Projekt głównej aplikacji dla systemu CF dla prywatnego użytku

# GulpTemplate

To jest mój główny template do pracy z Gulpem, GAS i standardowym frontendem.
### Cechy:
* Gulp 4
* ESLint zaintegorwany z Prettierem w oparciu o bibliotekę WesBos, bazującą na Airbnb + moje własne ustawienia
* Autocomplete dla Apps Script
* Bable (w tym preset dla Apps Script)

### Struktura
1. _dist_Browser (generowany - docelowe pliki frontendu)
   * css
   * img
   * js
2. _dist_Gas (generowany - docelowe pliki Apps Script)
    * browser
3. _dist_Tmp (generowany - robocze pliki frontendu)
   * css
   * img
   * js
4. _src_Browser (pliki źródłowe dla frontu (w tym Apps Script HTMLServices))
   * scss
      * reset
   * img
   * js
5. _src_Gas (pliki źródłowe dla Apps Script)

### Inicjacja
`npm i` w katalogu projektu

### Praca z GAS
Najpierw należy utworzyć projekt GAS lub sklonować istniejący.

#### Tworzenie nowych skryptów:
1. **Bound** dla już istniejącego arkusza : `clasp create --title "Nazwa" --parentId "xxxxxx" --rootDir ./_dist_Gas`
    * --parentId - ID pliku do którego ma być tenże skrypt przypisany (bound)
    * --rootDir - to ma być tak jak w przykładzie - tam będą pliki GAS
2. **Bound** dla nowego arkusza: `clasp create --title "Nazwa" --type sheets --rootDir ./_dist_Gas`. Plik zostanie utworzony bezpośrednio na Drivie
3. **Standalone**: `clasp create --title "Nazwa" --rootDir ./_dist_Gas`

#### Klonowanie istniejących skryptów:
1. Aby sklonować już istneijący: `clasp clone "xxxxxxxx" --rootDir ./_dist_Gas`
    * xxxxxxx - to ID lub URL skryptu do sklonowania lokalnego

### Komendy Gulpa:
#### Watchery:
* `gulp watchBrowser` - podczas pracy nad Frontendowym projektem
* `gulp watchGas` - podczas pracy nad GAS (bez HTMLServices)
* `gulp watchGasBrowser` - podczas pracy nad GAS z HTMLServices
#### Buildery
* `gulp buildDist` - tworzy gotową do uploadu na serwer paczkę Frontendową
* `gulp buildDistServer` - jak wyżej, ale przy okazji odpala BrowserSync aby ostatecznie sprawdzić wszystko
### Czyszczenie
* `gulp deleteAll` - usuwa wszsytkie wygenerowane katalogi - zostawia configi (w tym GAS) i sourcy
* `gulp deleteAllTotal` - usuwa wszsytkie wygenerowane katalogi oraz konfigi GAS - zostawia configi podstawowe

### JSDoc
Eksperymtntalnie `gulp doc` generuje dokumentację kodu do katalogu ./docs

### Dependency graph
Aby wyrysować graf zależności modułów wpisz:
* dla całego projektu: `madge --image ./dependency-graph/all.svg __src_Gas/index.js`
* dla fragmentu zmień ścieżkę np. `madge --image ./dependency-graph/parseCsvFiles.svg __src_Gas/libApp/bankParsers/parseCsvFiles.js`

Inne wartościowe komendy:
* `--orphans __src_Gas/` - moduły z których nikt nie korzysta

**Kody węzłów:**
* `madge --image ./dependency-graph/_createAccounts.svg __src_Gas/libApp/accounts/createAccounts/createAccounts.js`
* `madge --image ./dependency-graph/_categoriseCsv.svg __src_Gas/libApp/csv/categoriseCsv/categoriseCsv.js`
* `madge --image ./dependency-graph/_pastaDataIntoAccounts.svg __src_Gas/libApp/accounts/pastaDataIntoAccounts/pastaDataIntoAccounts.js`
* `madge --image ./dependency-graph/_renameAndMoveCsv.svg __src_Gas/libApp/csv/renameAndMoveCsv/renameAndMoveCsv.js`
---
Więcej o tym tu: https://github.com/pahen/madge
