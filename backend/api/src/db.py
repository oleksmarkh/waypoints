import os
from dataclasses import dataclass
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


@dataclass
class DbConfig:
  dialect: str
  driver: str
  host: str
  user: str
  password: str
  name: str


dbc = DbConfig(
  'postgresql',
  'pg8000',
  os.environ['DB_HOST'],
  os.environ['DB_USER'],
  os.environ['DB_PASSWORD'],
  os.environ['DB_NAME']
)

engine = create_engine(f"{dbc.dialect}+{dbc.driver}://{dbc.user}:{dbc.password}@{dbc.host}/{dbc.name}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
