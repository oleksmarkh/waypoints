from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .db import SessionLocal, engine
from .convert import model_to_schema


models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_methods=["*"],
  allow_headers=["*"],
)


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


@app.get("/waypoints/", response_model=list[schemas.Waypoint])
def get_waypoint_list(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)) -> list[models.Waypoint]:
  db_waypoint_list = crud.get_waypoint_list(db, skip=skip, limit=limit)
  return [model_to_schema(db_waypoint) for db_waypoint in db_waypoint_list]


@app.get("/waypoints/{id}", response_model=schemas.Waypoint)
def get_waypoint(id: int, db: Session = Depends(get_db)) -> models.Waypoint:
  db_waypoint = crud.get_waypoint(db, id)
  if db_waypoint is None:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return model_to_schema(db_waypoint)


@app.post("/waypoints/", response_model=schemas.Waypoint, status_code=201)
def create_waypoint(waypoint: schemas.WaypointCreate, db: Session = Depends(get_db)) -> models.Waypoint:
  db_waypoint = crud.create_waypoint(db=db, waypoint=waypoint)
  return model_to_schema(db_waypoint)


@app.post("/waypoints/{id}", response_model=schemas.Waypoint)
def update_waypoint(id: int, waypoint: schemas.WaypointUpdate, db: Session = Depends(get_db)):
  db_waypoint = crud.update_waypoint(db, id, waypoint)
  if db_waypoint is None:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return model_to_schema(db_waypoint)


@app.delete("/waypoints/{id}", status_code=204)
def delete_waypoint(id: int, db: Session = Depends(get_db)):
  is_deleted = crud.delete_waypoint(db, id)
  if not is_deleted:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return ''
