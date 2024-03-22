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
- Run dbCreator.py
