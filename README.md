[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/FadZhxrK)

# Dokumentacja/Instrukcja

Wszystkie ścieżki są względne, z poziomu folderu **_Project_**

Jeżeli część instrukcji/opisu jest zbyt dokładna to dlatego, że chcę pokazać, że rozumiem co się dzieje w projekcie.
Z kolei jeżeli inna część nie jest dostatecznie dokładna to zapewne uznałem coś za oczywiste lub przegapiłem.

## Uruchomienie

### Keycloak

Keycloak odpalony w dockerze z wolumenem komendą:<br>
`docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v /path/to/volume:/opt/jboss/keycloak/standalone/data quay.io/keycloak/keycloak:21.1.1 start-dev`<br>
/path/to/volume oczywiście musi być zmienione na poprawną ścieżkę.

Eksport skonfigurowanego realm znajduje się w folderze głównym repozytorium w pliku **_realm-export.json_**. Przy tworzeniu nowego realmu w Keycloak jest możliwość wrzucenia tego pliku aby skonfigurować realm.

Z jakiegoś powodu import użytkowników mi nie działa więc potrzebne jest manualne ich dodanie. Wszystkie ich istotne dane dla użytkowników testowych są w pliku **_user-export.json_** w folderze głównym repozytorium.

### Pliki .env

**_frontend/.env_** ma w sobie url Keycloaka, nazwę realmu oraz nazwę klienta. W tym przypadku:

```
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=Bezp
VITE_KEYCLOAK_CLIENT=my-app
```

**_backend/.env_** ma w sobie port, na którym nasłuchuje serwer oraz klucz publiczny z _Realm settings_ => _Keys_ w admin UI Keycloaka. W moim przypadku:

```
PORT=5000
PUBLICKEY=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlsQ3lQ9AbLPMSWvvPAm3HTv1vnt7o2jXiskMPZKt54KI4aY5NMRngsfwPlSSjUNVJIbkOI5/bEelCF8TzXju4zXQHtItfQkFYDNHs7G/ZMeK4P26VYOxsb03xbUyKxc9ctsOwf2/YINi9YIOa2Ro7ab8mqqSwk20AZDGPCUvrMViA7ysUKNZY1oaO+gtQjYbXEnYQAqHFD0EHBWZom+d2wPW8/7GOTE5Qv2tA4HPyx9lCyTBV6ys5eo5D/cZkd6eiUtwlPI9ftICh/e7wZQvfkzTBx9QvRS5mPHCOfvA+nF+FkfEk0XWtJO0K52NN33NO9LootX7A82J8C/V4wGu6QIDAQAB
```

### Frontend

W folderze **_frontend/_** zależności zainstalowane komendą `npm install`, projekt React Vite uruchomiony za pomocą `npm run dev`.
Możliwe jest też `npm run build` i `npm run preview`, lecz to może wymagać zmiany **Valid redirect URIs** i **Valid post logout redirect URIs** w Keycloak admin UI, ponieważ zmienia się wtedy port, na którym pracujemy.

### Backend

W folderze **_backend/_** zależności zainstalowane komendą `npm install`, aplikacja Node Express uruchomiona za pomocą `node index.js`. Możliwe jest też użycie `npm start` aby włączyć aplikację z aktywnym nodemonem (może to wymagać instalacji nodemona osobno poprzez `npm install nodemon`).

## Użycie

W naszym realmie są role app-user oraz app-admin połączone z rolami user I admin w kliencie myclient. W celach testowych mam dane dla użytkownika user o mailu user@gmail.com z rolą _user_, oraz użytkownika admin admin@gmail.com z rolą _admin_. Możliwe jest też rejestrowanie nowych użytkowników, domyślnie dostaną oni rolę _user_, jednak nie ma dla nich personalizowanych danych.

Po zalogowaniu można wejść w "User Page" (komponent _Protected.jsx_) i pojawi się tam "<_username_> data" od serwera. Jeżeli spróbujemy wejść bez logowania zostaniemy przekierowani na stronę logowania.

Przycisk "Admin Panel" pojawi się po zalogowaniu jako użytkownik z rolą admin. Po wejściu tam dostaniemy "Admin data" od serwera (oczywiście pod warunkiem, że mamy odpowiednią rolę).

## Flow

### Ogólnie

0. Rejestracja klienta: Przed możliwością uwierzytelniania konieczne jest zarejestrowanie klienta w Keycloak.

1. Uwierzytelnianie użytkownika: Użytkownik klika link do logowania. PKCE: w tym etapie generowany jest też _Code Verifier_ i _Code Challenge_. Wysyłane jest żądanie o autoryzację. Jeżeli użytkownik nie jest zalogowany to zostaje przekierowany do formularza uwierzytelniania Keycloak. Tam się loguje.

2. Kod autoryzacyjny: Po zalogowaniu Keycloak wysyła kod autoryzacyjny, który jest odsyłany razem z _Code Verifier_ (PKCE).

3. Wydawanie tokena dostępowego: Po pomyślnym uwierzytelnieniu (PKCE: za pomocą _Code Verifier_ oraz _Code Challenge_) Keycloak wydaje token dostępowy dla klienta. Token zawiera informacje o użytkowniku, uprawnieniach i okresie ważności.

4. Weryfikacja tokenu dostępowego: Kiedy użytkownik zażąda dostępu do zasobów weryfikowana jest poprawność podpisu tokena dostępowego przy użyciu klucza publicznego Keycloak. Jeśli weryfikacja jest pomyślna, klient uzyskuje dostęp do zasobów.

### Ta aplikacja

1. **_frontend/src/App.jsx_** |
   Tutaj zaczynamy od wywołania hooka _useAuth_.

2. **_frontend/src/hooks/useAuth.jsx_** |
   Tutaj dzieje się większość autoryzacji ze strony frontendowej.

   Zaczynamy od inicjalizacji keycloaka z opcją PKCE. Sprawdzone jest czy użytkownik jest już zalogowany. Jeżeli nie to podajemy mu stronę logowania, inaczej przechodzimy dalej.

   Jak użytkownik się zaloguje to ustawiamy **isLoggedIn** na **true**, zapisujemy jego **token** i sprawdzamy czy posiada rolę _admin_. Następnie te informacje, razem z prostymi funkcjami do logowania i wylogowywania, są przekazywane dalej. Hook jest updatowany przy każdym nowym renderze, więc sprawdzamy czy dane są wciąż ważne za każdym razem kiedy chcemy dostać się do nowych danych na stronie.

3. **_frontend/src/components/Nav.jsx_** |
   Ten komponent mocno się zmienia w zależności od wyżej wymienionych danych. Przycisk "Log In" zmienia się na "Log Out" jeżeli użytkownik jest zalogowany. Przycisk "User Page" przenosi do strony logowania jeżeli użytkownik nie jest zalogowany, lub do strony z danymi użytkownika jeżeli jest. Przycisk "Admin Panel" pojawia się tylko jeżeli użytkownik ma rolę _admin_.

4. **_frontend/src/components/Protected.jsx_** |
   Komponent _Protected_ (a także Admin Panel) wysyłają zapytanie do **backendu** o dane, wraz z tokenem uwierzytelniającym. Admin Panel ma dodatkowe kilka warstw sprawdzających czy użytkownik ma odpowiednią rolę.

5. **_backend/Routes/authenticate.js_** |
   Po przekierowaniu zapytania sprawdzamy czy token jest poprawny za pomocą klucza publicznego (w **_.env_**). Jeżeli weryfikacja odbędzie się poprawnie, dane są wysyłane, inaczej wyrzucany jest błąd. Jeżeli spróbujemy wejść w komponent na siłę to dla komponentu _Protected_ dostajemy informację o braku danych, a dla panelu admina dostajemy tylko błąd i napis "Unauthorized".
