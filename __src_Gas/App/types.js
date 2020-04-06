/**
 * Struktura obiektu z danymi na temat funkcji / zadań
 * @typedef {Object} ExperimentTasks Dane na temat funkcji.
 * @property {string} printTo Do którego pliku ma wklejać dane. Musi odpowiadać obiektowi PRINT_TO z configu
 * @property {string} sheet Nazwa arkusza do którego mają być wklejone wyniki
 * @property {function} callback Skurowana funkcja do wykonania
 * @property {string} desc Opis jakie pojawi się w pliku z wynikami
 */

/**
 * Struktura obiektu z danymi na temat arkuszy testowych
 * @typedef {Object} ExperimentSheet Dane arkuszy testowych.
 * @property {boolean} status Sprawdza czy ten slot został wypełniony danymi
 * @property {string} printName Nazwa pojawiająca się w tabeli czasów
 * @property {number} size Wielkość arkusza w wierszach lub kolumnach
 * @property {string} sheetLocal Nazwa lokalnego arkusza
 * @property {string} sheetHub Nazwa arkusza w hubie
 * @property {string} sheetExternal Nazw arkusza w zewnętrznym skoroszycie
 * @property {string} externalUrl Url zewnętrznego skoroszytu
 */

export {};
