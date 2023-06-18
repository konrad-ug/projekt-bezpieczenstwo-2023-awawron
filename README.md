[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/FadZhxrK)

## Dokumentacja/Instrukcja

Wszystkie ścieżki są względne, z poziomu folderu _Project_

### Uruchomienie

#### Keycloak

#### Frontend

#### Backend

### Użycie

U nas jest użytkownik user (rola user) i admin (role _user_ i _admin_). Hasła są takie same jak nazwy użytkownika w celach testowych, a maile to _username_@gmail.com. Możliwe jest też rejestrowanie nowych użytkowników, domyślnie dostaną oni rolę _user_.

Po zalogowaniu można wejść w "User Page" (komponent _Protected.jsx_) i pojawi się tam "_username_ data" od serwera. Jeżeli spróbujemy wejść bez logowania zostaniemy przekierowani na stronę główną.

Przycisk "Admin Panel" pojawi się po zalogowaniu jako użytkownik z rolą admin. Po wejściu tam dostaniemy "Admin data" od serwera.

### Flow

#### Ogólnie

0. Rejestracja klienta: Przed możliwością uwierzytelniania konieczne jest zarejestrowanie klienta w Keycloak.

1. Uwierzytelnianie użytkownika: Użytkownik zostaje przekierowany do formularza uwierzytelniania Keycloak. Tam się loguje.

2. Wydawanie tokena dostępowego: Po pomyślnym uwierzytelnieniu Keycloak wydaje token dostępowy dla klienta. Token zawiera informacje o użytkowniku, uprawnieniach i okresie ważności.

3. Weryfikacja tokenu dostępowego: Weryfikowana jest poprawność podpisu tokena dostępowego przy użyciu klucza publicznego Keycloak. Jeśli weryfikacja jest pomyślna, klient uzyskuje dostęp do zasobów.

#### Ta aplikacja

1. _frontend/src/App.jsx_
   Tutaj zaczynamy od wywołania hooka useAuth
2. _frontend/src/hooks/useAuth.jsx_
   Tutaj dzieje się większość autoryzacji ze strony frontendowej.

   Zaczynamy od inicjalizacji keycloaka, po czym sprawdzamy czy użytkownik jest już zalogowany. Jeżeli nie to podajemy mu stronę logowania, inaczej przechodzimy dalej.

   Jak użytkownik się zaloguje to ustawiamy **isLoggedIn** na **true**, zapisujemy jego **token** i sprawdzamy czy posiada rolę admin. Następnie te informacje, razem z prostymi funkcjami do logowania i wylogowywania, są przekazywane dalej. Hook jest updatowany przy każdym nowym renderze, więc sprawdzamy czy dane są wciąż ważne za każdym razem kiedy chcemy dostać się do nowych danych na stronie.

3. _frontend/src/components/Nav.jsx_
   Ten komponent mocno się zmienia w zależności od wyżej wymienionych danych. Przycisk "Log In" zmienia się na "Log Out" jeżeli użytkownik jest zalogowany. Przycisk "User Page" przenosi do strony logowania jeżeli użytkownik nie jest zalogowany, lub do strony z danymi użytkownika jeżeli jest. Przycisk "Admin Panel" pojawia się tylko jeżeli użytkownik ma rolę _admin_.

4. _frontend/src/components/Protected.jsx_
   Komponent _Protected_ (a także Admin Panel) wysyłają zapytanie do **backendu** o dane, wraz z tokenem uwierzytelniającym.

5. _backend/Routes/authenticate.js_
   Po przekierowaniu zapytania sprawdzamy czy token jest poprawny za pomocą klucza publicznego (w _.env_). Jeżeli weryfikacja odbędzie się poprawnie, dane są wysyłane, inaczej wyrzucany jest błąd.
