from time import time
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geometry

Base = declarative_base()


class Waypoint(Base):
  __tablename__ = 'waypoints'
  id = Column(Integer, primary_key=True)
  name = Column(String)
  coords = Column(Geometry('POINT'))
  created_at = Column(DateTime(timezone=True), server_default=func.now())
