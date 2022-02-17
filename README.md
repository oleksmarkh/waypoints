# Waypoints
## Structure
```bash
```

<!-- ## Assumptions -->
<!-- ## Possible improvements -->

## Dependencies
### Backend
#### Python env
* env/deps management: [`poetry`](https://python-poetry.org/docs/basic-usage/)

#### App runtime
* ASGI server: [`uvicorn`](https://www.uvicorn.org/)
* app framework: [`fastapi`](https://github.com/tiangolo/fastapi)
* SQL toolkit: [`sqlalchemy`](https://www.sqlalchemy.org/)

#### Dev env
* linter: [`pycodestyle`](https://pycodestyle.readthedocs.io/en/latest/)
* unit tests: [`pytest`](https://pytest.org/en/latest/)

### Frontend
#### App runtime
#### Dev env

## Commands
### Backend
```bash
$ docker-compose up --build
$ docker-compose up -d
# visit http://localhost:8000/ and http://localhost:8000/docs

$ docker-compose ps -a
$ docker-compose down
$ docker logs -f <container-id>
$ docker image prune
```

#### DB
```bash
$ docker-compose exec db pg_dump waypoints -U postgres
```

#### API
```bash
# init DB (create tables based on sqlalchemy models)
$ docker-compose run api poetry run python src/init-db.py

# start web server
$ docker-compose run api poetry run uvicorn main:app
# $ docker-compose run api poetry run uvicorn main:app --reload

# lint
$ docker-compose run api poetry run pycodestyle --show-source ./src/

# unit tests
$ docker-compose run api poetry run pytest ./src/
```

### Frontend
```bash
```
