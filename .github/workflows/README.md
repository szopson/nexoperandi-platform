# GitHub Actions Deployment

Automatyczny deployment na VPS po każdym push do branch `main`.

## Konfiguracja Secrets

Przed uruchomieniem workflow musisz dodać następujące secrets w GitHub:

1. Przejdź do: **Repository → Settings → Secrets and variables → Actions**
2. Dodaj następujące secrets:

### Wymagane Secrets:

- **`VPS_HOST`** - IP lub domena VPS (np. `123.45.67.89`)
- **`VPS_USERNAME`** - Nazwa użytkownika SSH (zwykle `root`)
- **`VPS_SSH_KEY`** - Klucz prywatny SSH (patrz instrukcja poniżej)
- **`VPS_PORT`** - Port SSH (domyślnie `22`)

---

## Jak wygenerować klucz SSH

### Na VPS (serwer):

```bash
# Zaloguj się na VPS
ssh root@twoj-vps-ip

# Wygeneruj klucz SSH (jeśli nie masz)
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy

# Dodaj klucz publiczny do authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Wyświetl klucz prywatny (skopiuj całość)
cat ~/.ssh/github_deploy
```

**Skopiuj całą zawartość klucza prywatnego** (od `-----BEGIN` do `-----END`) i dodaj jako secret `VPS_SSH_KEY`.

---

## Jak działa workflow?

1. **Trigger**: Uruchamia się automatycznie po każdym push do `main`
2. **Połączenie SSH**: Łączy się z VPS używając secrets
3. **Pull**: Pobiera najnowszy kod z GitHub
4. **Install**: Instaluje zależności (jeśli potrzeba)
5. **Build**: Buduje projekt (`pnpm build`)
6. **Restart**: Restartuje aplikację przez PM2

---

## Ręczne uruchomienie

Możesz też uruchomić deployment ręcznie:

1. Przejdź do: **Actions → Deploy to VPS**
2. Kliknij **Run workflow**
3. Wybierz branch `main`
4. Kliknij **Run workflow**

---

## Troubleshooting

### Błąd: "Permission denied"
- Sprawdź czy klucz SSH jest poprawny
- Upewnij się że klucz publiczny jest w `~/.ssh/authorized_keys` na VPS

### Błąd: "pnpm: command not found"
- Zainstaluj pnpm na VPS: `npm install -g pnpm@8.15.0`

### Błąd: "PM2 process not found"
- Przy pierwszym wdrożeniu użyj ręcznego deployu
- PM2 musi być zainstalowany: `npm install -g pm2`

---

## Monitoring

Po każdym deployment możesz sprawdzić:

```bash
# Status aplikacji
pm2 status

# Logi aplikacji
pm2 logs nexoperandi-website

# Restart ręczny
pm2 restart nexoperandi-website
```
