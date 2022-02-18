#!/bin/sh
# wait-for-postgres.sh

set -e

while ! nc -z $DB_HOST $DB_PORT; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"
