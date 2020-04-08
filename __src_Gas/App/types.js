/**
 * Ustawienia całego eksperymentu
 * @typedef {Object} ExpSetup
 * @property {string} title Nazwa eksperymentu. Pojawia się w opisie wyniku w czwartek kolumnie oraz w nazwach plików wynikowych
 * @property {string} method Metoda eksperymentu. Pojawia się w opisie wyniku w piątek kolumnie. Mało istotna obecnie
 * @property {ExpStructure} structure Struktura arkusza biorącego udział w ekspermencie
 * @property {Object<string, number>} samples Rozmiar arkuszy biorących udział w eksperymencie. Dostępnych jest maksymalnie 8 slotów. Można użyć mniej nie tworząc właściwości s2-s8. Musi być min jeden arkusz.
 * @property {Object<string, PrintResults>} printTo Info na temat plików, do których wklajane są dane z eksperymentów
 *
 */

/**
 * Struktura eskperymentu
 * @typedef {Object} ExpStructure
 * @property {'col'|'row'} fixed Który wymiar arkusza jest niezmienny
 * @property {number} fixedSize Wielkość stałego wymiaru
 * @property {boolean} randomData Czy wypełnić losowymi danymi
 */

/**
 * Obiekt z zadaniem do wykonania
 * @typedef {Object} ExpTasks Dane na temat funkcji.
 * @property {string} geo Do którego pliku ma wklejać dane. Musi odpowiadać obiektowi printTo z EXP_SETUP w configu
 * @property {string} sheet Nazwa arkusza do którego mają być wklejone wyniki
 * @property {function} callback Skurowana funkcja do wykonania
 * @property {string} desc Opis jakie pojawi się w pliku z wynikami
 */

/**
 * Arkusze z danymi testowwymi (cele)
 * @typedef {Object} ExpSheet Dane arkuszy testowych.
 * @property {boolean} status Sprawdza czy ten slot został wypełniony danymi
 * @property {string} printName Nazwa pojawiająca się w tabeli czasów
 * @property {number} size Wielkość arkusza w wierszach lub kolumnach
 * @property {string} sheetLocal Nazwa lokalnego arkusza
 * @property {string} sheetHub Nazwa arkusza w hubie
 * @property {string} externalId ID zewnętrznego skoroszytu
 */

/**
 * Pliki z wynikami eksperymentów
 * @typedef {Object} PrintResults Dane plików z wynikami
 * @property {string} prefix Prefiks typu 'A' używany w nazwie pliku w celu sortowanie wg. określonego porządku
 * @property {string} name Nazwa pojawiająca się zarówno w nazwie jak i w samym pliku (np. Local, Hub).
 * @property {string} colorLight Kolor w hexie jaśniejszych teł w pliku
 * @property {string} colorDark Kolor w hexie ciemniejszych teł w pliku
 * @property {PrintResultsSheets} sheetsMeaning Krótkie info co zawierają określone (a-f) arkusze w pliku z wynikami. Nazwy te pojawiają się m.in. w opisach wykresów
 */

/**
 * Arkusze z wynikami eksperymentów
 * @typedef {Object} PrintResultsSheets Dane arkuszy z wynikami
 * @property {string} a Zawartość arkusza A
 * @property {string} b Zawartość arkusza B
 * @property {string} c  Zawartość arkusza C
 * @property {string} d  Zawartość arkusza D
 * @property {string} e  Zawartość arkusza E
 * @property {string} f Zawartość arkusza F
 */

export {};
