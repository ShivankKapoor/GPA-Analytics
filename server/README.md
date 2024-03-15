# Flask Backend

## Run Command
Run with ```pipenv run python3 app.py```

## Regnerate SQL Database
1. ```pipenv run python3```
2. ```from app import app,db```
3. ```app.app_context.push()```
4. ```db.create_all()```
