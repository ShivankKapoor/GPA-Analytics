# GradeApp

## Flask Backend

### Docker Run Command
1. ```docker build -t grade-app-api:latest -f Dockerfile .```
2. ```docker container run -d -p 3000:3000 grade-app-api:latest```

### Regnerate SQL Database
1. ```pipenv run python3```
2. ```from app import app,db```
3. ```app.app_context().push()```
4. ```db.create_all()```
