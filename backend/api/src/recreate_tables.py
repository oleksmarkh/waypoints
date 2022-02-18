import os
from dataclasses import dataclass
from sqlalchemy import create_engine
from models import Base, Waypoint


@dataclass
class DbConfig:
  host: str
  user: str
  password: str
  name: str


db_config = DbConfig(
  os.environ['DB_HOST'],
  os.environ['DB_USER'],
  os.environ['DB_PASSWORD'],
  os.environ['DB_NAME']
)

engine = create_engine(f"postgresql+pg8000://{db_config.user}:{db_config.password}@{db_config.host}/{db_config.name}")

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

print(f"Table created: '{Waypoint.__tablename__}'")
