FROM python:3.10.2-alpine

WORKDIR /home

ENV \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  POETRY_VERSION=1.1.13

RUN apk add --no-cache gcc libffi-dev musl-dev g++
RUN pip install "poetry==$POETRY_VERSION"

COPY setup.cfg pyproject.toml poetry.lock wait-for-postgres.sh ./

RUN poetry install
