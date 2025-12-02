# Docker / Docker Compose — DJ Marcel

Instructions pour builder et lancer l'application avec Docker Compose (Windows PowerShell).

Pré-requis
- Docker Desktop installé et démarré
- Compose v2+ (généralement inclus dans Docker Desktop)

Builder et lancer (mode détaché) :

```powershell
# build + lancer en arrière-plan
docker compose up --build -d

# voir les logs
docker compose logs -f

# arrêter et supprimer les conteneurs
docker compose down
```

Notes pratiques
- L'application écoute sur le port 3000. Accédez à http://localhost:3000
- Le `docker-compose.yml` monte le répertoire courant dans le conteneur pour faciliter le développement. Si vous voulez une image immuable sans montages, supprimez la section `volumes` dans le service `web`.
- Sur Windows, le montage de volumes peut ralentir les IO. Pour une exécution en production, préférez construire l'image sans monter le code source et exécutez-la avec `NODE_ENV=production`.

Construire l'image sans compose :

```powershell
docker build -t dj-marcel-app:latest .
docker run -p 3000:3000 dj-marcel-app:latest
```
