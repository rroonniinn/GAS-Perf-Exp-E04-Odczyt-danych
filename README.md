# Perf. Exp | Odczyt : Całość : 1 min

#### Cel
Poznanie czasów odczytu danych dla:
1. Różnych struktur arkuszy (internal, external, cache)
2. Różnych wielkości arkuszy (zestawu danych)
3. Różnych sposobów odczytu danych (DataRange, zapis A1:O100 lub A1:O)

#### Zadanie
1. Odczyt wszystkich danych ze wskazanego źródła (cały zakres)

#### Próbki / sample
Arkusze o 15 kolumnach, o różnej liczbie wierszy: od 100 do 16 000

#### Struktura
1. Loc
2. Hub
3. Ext
4. Cache

#### Warianty:
##### Dla Loc, Hub, Ext:
Pobranie danych za pomocą
- 1. 'DataRange', czyli zakres jest wyliczany wbudowaną metodą getDataRange()
- 2. 'Full' - dokładne podanie zakrsu - np. A1:O100
- 3. 'Short' - jak wyżej ale bez wyliczania końca zakresu - np. A1:O

##### Cache
Tylko podstawowa metoda oparta o Crushera

#### Częstotliwość testu
Co minutę

#### Pliki na Drivie (wsztstkie wersje czasowe)
https://drive.google.com/drive/folders/17q8DIriXcrxu_NIGW-rZwhYOVwYRRFa7
