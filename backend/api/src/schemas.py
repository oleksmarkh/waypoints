from datetime import datetime
from pydantic import BaseModel, validator


class Coords(BaseModel):
  lat: float
  lng: float

  @validator('lat')
  def lat_within_range(cls, value):
    min = -90
    max = 90
    if not min < value < max:
      raise ValueError(f'Latitude {value} outside allowed [{min}, {max}] range')
    return value

  @validator('lng')
  def lng_within_range(cls, value):
    min = -180
    max = 180
    if not min < value < max:
      raise ValueError(f'Longitude {value} outside allowed [{min}, {max}] range')
    return value


class WaypointBase(BaseModel):
  name: str
  coords: Coords


class WaypointCreate(WaypointBase):
  pass


# only ".name" is allowed to be updated via POST,
# so this class is not extending "WaypointBase"
class WaypointUpdate(BaseModel):
  name: str


class Waypoint(WaypointBase):
  id: int
  created_at: datetime

  class Config:
    orm_mode = True
