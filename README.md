# Waypoints
## Structure
```bash
```

<!-- ## Assumptions -->
<!-- ## Possible improvements -->

## Dependencies
### Backend
#### Container
* [Docker](https://docs.docker.com/reference/)

#### DB
* SQL engine/dialect: [PostgreSQL](https://www.postgresql.org/docs/14/index.html)
* spatial extension: [PostGIS](https://postgis.net/docs/)

#### Python env
* env/deps management: [`poetry`](https://python-poetry.org/docs/basic-usage/)

#### App runtime
* ASGI server: [`uvicorn`](https://www.uvicorn.org/)
* app framework: [`fastapi`](https://github.com/tiangolo/fastapi)
* SQL toolkit: [`sqlalchemy`](https://www.sqlalchemy.org/) + [`geoalchemy2`](https://geoalchemy-2.readthedocs.io/)

#### Dev env
* linter: [`pycodestyle`](https://pycodestyle.readthedocs.io/en/latest/)
* unit tests: [`pytest`](https://pytest.org/en/latest/)

### Frontend
#### App runtime
#### Dev env

## TODO
### Backend
* Mount a volume for DB files, so it persists among container recreations.
* Configure logging and mount a volume for it.

### Frontend

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
$ docker-compose exec db psql waypoints postgres
```

#### API
```bash
# lint
$ docker-compose run api poetry run pycodestyle --show-source ./src/

# unit tests
$ docker-compose run api poetry run pytest ./src/
```

### Frontend
```bash
```
