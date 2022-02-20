from geoalchemy2.shape import from_shape
from shapely.geometry import Point


from ..schemas import Coords
from ..convert import wkb_to_coords


def test_wkb_to_coords():
  assert wkb_to_coords(from_shape(Point(13.3985, 52.4730), srid=4326)) == Coords(lat=52.4730, lng=13.3985)
  assert wkb_to_coords(from_shape(Point(13.3628, 52.5133), srid=4326)) == Coords(lat=52.5133, lng=13.3628)
