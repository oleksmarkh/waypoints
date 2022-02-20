import pytest
from pydantic import error_wrappers

from ..schemas import Coords


def test_coords():
  Coords(lat=0, lng=0)
  Coords(lat=10, lng=180)
  Coords(lat=-90, lng=120)
  Coords(lat=90, lng=180)

  with pytest.raises(error_wrappers.ValidationError):
    Coords(lat=10, lng=181)
    Coords(lat=-91, lng=120)
