from unicodedata import name
from sqlalchemy.orm import Session

from . import models, schemas
from .convert import coords_to_wkt


def get_waypoint(db: Session, id: int) -> models.Waypoint | None:
  return db.query(models.Waypoint).filter(models.Waypoint.id == id).first()


def get_waypoint_list(db: Session, skip: int, limit: int) -> list[models.Waypoint]:
  return db.query(models.Waypoint).offset(skip).limit(limit).all()


def create_waypoint(db: Session, waypoint: schemas.WaypointCreate) -> models.Waypoint:
  db_waypoint = models.Waypoint(
    name=waypoint.name,
    coords=coords_to_wkt(waypoint.coords)
  )
  db.add(db_waypoint)
  db.commit()
  return db_waypoint


def update_waypoint(db: Session, id: int, waypoint: schemas.WaypointUpdate) -> models.Waypoint | None:
  db_waypoint = db.query(models.Waypoint).filter(models.Waypoint.id == id).first()
  if db_waypoint is None:
    return None

  db_waypoint.name = waypoint.name
  db.commit()
  return db_waypoint


def delete_waypoint(db: Session, id: int) -> bool:
  db_waypoint = db.query(models.Waypoint).filter(models.Waypoint.id == id).first()
  if db_waypoint is None:
    return False

  db.delete(db_waypoint)
  db.commit()
  return True
