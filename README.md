# EV3 Christmas Ball Decorator
'EV3 Christmas Ball Decorator' to projekt pozwalający na łatwe przyozdabianie bombek choinkowych własnymi wzorami.
Wzory można projektować w dedykowanym edytorze. Pozwala on na łatwe utworzenie grafiki i przekonwertowanie jej na instrukcje zrozumiałe dla plotera. Instrukcje te wklejane są jako tablica do oprogramowania dla brick'a EV3. 

Projekt składa się z 3 zasadniczych elementów:
- Dekoratora z LEGO
- Edytora wzorów
- Oprogramowania dla brick'a EV3

# Dodatkowe materiały
- Gumka recepturka (gumka z zestawu może być zbyt krótka)
- Pisak permanentny, najlepiej w kolorze kontastującym z barwą bombek
- Bombki choinkowe o średnicy 6 cm


# Budowa modelu
Instrukcje potrzebne do budowy modelu dostępne są jako plik pdf.
Wszystkie elementy wymagane do budowy zawarte są w zestawie LEGO® MINDSTORMS® EV3 31313.

# Pisak
Pisak powinien pisać w kolorze dobrze kontrastującym z barwą bombki.
> Uwaga! Pisaki permanentne bardzo szybko wysychają, należy zamykać je bezzwłocznie po każdym drukowaniu.

## Montaż
Pisak montujemy przy pomocy gumki w uchwycie.

## Dostosowanie wysokości pisaka
Program posiada na stałe zdefiniowane miejsca w których powinna znaleźć się końcówka pisaka.
Jeżeli po uruchomieniu programu pisak nie dotyka ozdoby należy po prostu obniżyć jego pozycję w uchwycie.
Różnica pomiędzy pozycjami UP i DOWN pisaka wynosi około 5 mm.

# Bombki choinkowe
Model został zaprojektowany z myślą o bombkach o średnicy 6 cm. Ozdoby o innej średnicy mogą wymagać modyfikacji modelu.
Nadrukowane wzory są lepiej widoczne na bombkach lśniących niż na matowych.

## Przygotowanie
Przed przystąpieniem do drukowania wzoru bombki należy umyć, by pozbyć się wszystkich zabrudzeń z ich powierzchni. Czyste kule lepiej trzymają się gumowych opon oraz łatwiej jest po nich pisać.
Należy usunąć uchwyt zawieszki ozdoby.

## Montaż
Bombkę należy zamontować tak, by oś lewego uchwytu znalazła się w środku ozdoby. Następnie należy docisnąć bombkę prawym uchwytem zwracając uwagę na to, by była ona możliwie wycentrowana. 

# Edytor wzorów
Dla modelu został przygotowany dedykowany edytor pozwalający na prostą edycję wzorów, które mają zostać nadrukowane na ozdobie. Edytor ten jest dostępny jako aplikacja webowa. Aby go uruchomić należy otworzyć plik `Edytor.html` za pomocą przeglądarki internetowej. Edytor został przygotowany z myślą o przeglądarkach opartych na silniku Chromium.

# Przenoszenie wzoru z edytora do oprogramowania brick'a
Aby przenieść zaprojektowany w edytorze wzór należy użyć przycisku `Pobierz wzór`. Wzór zostanie przekonwertowany na instrukcje dla brick'a. Instrukcje te są automatycznie kopiowane do schowka. W razie gdyby kopiowanie nie powiodło się należy zrobić to ręcznie zaznaczając całość instrukcji z pola tekstowego. 
Dane zostały przygotowane w taki sposób, że oprogramowanie EV3 rozpozna je jako blok tablicy.
Po uruchomieniu programu dla brick'a dostarczonego w projekcie należy otworzyć podprogram `Instructions`. W środku znajduje się tylko blok start oraz tablica z instrukcjami. Należy usunąć blok tablicy i wkleić ten z nowymi instrukcjami.

![Instructions block](readme-data/InstructionBlock.png)

> Uwaga! Nie próbuj podglądać wartości zapisanych w tablicy z poziomu edytora EV3 - próba podglądu zawiesi go na jakiś czas.

# Drukowanie wzoru
Po przeniesieniu instrukcji do programu dla brick'a można uruchomić **główny program** (`Main`).
Urządzenie samo się skalibruje i przystąpi do druku. Podczas drukowania na ekranie wyświetlany jest postęp operacji.
Koniec operacji drukowania zostanie zasygnalizowany dźwiękowo. Możesz teraz wyjąć swoją ozdobę!