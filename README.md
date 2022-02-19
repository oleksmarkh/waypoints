# Waypoints
## Structure
```bash
```

## Simplifications
* DB files aren't mount to any volume.
* Backend API utilizes only default FastAPI logging and no volume is mount for keeping/rotating/streaming the logs.
* No centralized error reporting.
* No auto-recovery, no monitoring rather than Docker tools.
* Frontend is not containerized, since:
  * It doesn't require a runtime for serving bundled static files.
  * There's no CI/CD.
* Credentials are stored in `.env` files, no specific secrets-management.

## Dependencies
### Backend
#### Containerization
* engine: [Docker](https://docs.docker.com/reference/)

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
* UI framework: [`react`](https://reactjs.org/docs/)
* map rendering/interactions: [`leaflet`](http://leafletjs.com/)
* CSS class names util: [`classnames`](https://github.com/JedWatson/classnames/)

#### Dev env
* language/compiler: [`typescript`](https://www.typescriptlang.org/docs/)
* bundler: [Create React App](https://create-react-app.dev/)
* linters: [`eslint`](https://eslint.org/) + [`stylelint`](https://stylelint.io/)
* unit tests: [`jest`](https://jestjs.io/)
* components in isolation: [`storybook`](https://storybook.js.org/docs/react/get-started/whats-a-story)

## TODO
### Backend
* Unit tests.
* Functional tests against HTTP methods.
### Frontend
* Test for basic layout responsiveness.
* Test against slow network.
* Check Lighthouse reports, including accessibility recommendations.
* Unit tests.
* Storybook stories.

## Commands
### Backend
```bash
$ cd ./backend/  # contains ".env" file for docker-compose
$ docker-compose up --build
$ docker-compose up
# visit http://localhost:8000/docs for Swagger UI

$ docker logs -f <container-id>
$ docker-compose ps -a
$ docker-compose down
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
# assumes Node version "17.5.0" and NPM version "8.4.1"
$ npm ci             # install deps
$ npm run lint       # lint TS and Sass
$ npm test           # run unit tests
$ npm run storybook  # compile and serve Storybook stories
$ npm start          # run a local CRA dev server
$ npm run build      # produce a build artifact
$ npm run serve      # run a local Python web server in "./build/"
```
