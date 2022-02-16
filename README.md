# Waypoints
## Structure
```bash
```

<!-- ## Assumptions -->
<!-- ## Possible improvements -->

## Dependencies
### Backend
#### Python env
* python versioning: [`pyenv`](https://github.com/pyenv/pyenv/)
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
### DB
```bash
# TODO: replace "brew" commands with Linux package manager
$ brew install postgres
$ brew services start postgresql
# $ psql postgres

$ createdb waypoints
# $ pg_dump waypoints > dump.sql
```

### Backend
```bash
# python version
# TODO: replace "brew" commands with Linux package manager
$ brew install pyenv
$ pyenv install 3.10.2

# python deps
$ curl -sSL https://install.python-poetry.org | python3 -
$ poetry install

# init DB (create tables based on sqlalchemy models)
$ poetry run python ...

# start web server
$ uvicorn main:app
# $ uvicorn main:app --reload

# lint
$ poetry run pycodestyle --show-source ./src/

# unit tests
$ poetry run pytest ./src/
```

### Frontend
```bash
```
