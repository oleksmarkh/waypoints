from geoalchemy2.types import Geometry
from geoalchemy2.functions import ST_Point, ST_SetSRID
from geoalchemy2.shape import to_shape, WKBElement

from . import models, schemas


def coords_to_wkt(coords: schemas.Coords) -> Geometry:
  """
  Instructs PostGIS to convert `{lat, lng}` object to `'SRID=4326;POINT(lng lat)'`.
  """
  return ST_SetSRID(ST_Point(coords.lng, coords.lat), 4326)


def wkb_to_coords(wkb: WKBElement) -> schemas.Coords:
  """
  Converts WKB (used by PostGIS) to `{lat, lng}` object.
  """
  shape_coords = to_shape(wkb)
  return schemas.Coords(
    lat=shape_coords.y,
    lng=shape_coords.x
  )


def model_to_schema(db_waypoint: models.Waypoint) -> schemas.Waypoint:
  """
  Converts DB-storable/retrieveable object into HTTP-transportable object.
  """
  return schemas.Waypoint(
    id=db_waypoint.id,
    name=db_waypoint.name,
    coords=wkb_to_coords(db_waypoint.coords),
    created_at=db_waypoint.created_at
  )
