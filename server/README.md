# GradeApp

## Flask Backend

### Docker Run Command
```bash
docker build -t grade-app-api:latest -f Dockerfile .
```

```bash
docker container run -d -p 3000:3000 grade-app-api:latest
```

### Regnerate SQL Database

```bash
pipenv run python3
```

```bash
from app import app,db
```

```bash
app.app_context().push()
```

```bash
db.create_all()
```
