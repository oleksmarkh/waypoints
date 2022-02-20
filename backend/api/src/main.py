from fastapi import Depends, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .db import SessionLocal, engine
from .convert import model_to_schema


models.Base.metadata.create_all(bind=engine)

tags_metadata = [
  {
    "name": "get waypoints",
    "description": "Paginate waypoints from latest to earliest.",
  },
  {
    "name": "get waypoint",
    "description": "Retrieve individual endpoint.",
  },
  {
    "name": "create waypoint",
    "description": "Create individual endpoint (name and coords).",
  },
  {
    "name": "update waypoint",
    "description": "Update individual waypoint (name only).",
  },
  {
    "name": "delete waypoint",
    "description": "Delete individual waypoint.",
  },
]

app = FastAPI(openapi_tags=tags_metadata)
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


@app.get("/waypoints/", response_model=list[schemas.Waypoint], tags=["get waypoints"])
def get_waypoint_list(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[models.Waypoint]:
  db_waypoint_list = crud.get_waypoint_list(db, skip=skip, limit=limit)
  return [model_to_schema(db_waypoint) for db_waypoint in db_waypoint_list]


@app.get("/waypoints/{id}", response_model=schemas.Waypoint, tags=["get waypoint"])
def get_waypoint(id: int, db: Session = Depends(get_db)) -> models.Waypoint:
  db_waypoint = crud.get_waypoint(db, id)
  if db_waypoint is None:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return model_to_schema(db_waypoint)


@app.post("/waypoints/", response_model=schemas.Waypoint, status_code=201, tags=["create waypoint"])
def create_waypoint(waypoint: schemas.WaypointCreate, db: Session = Depends(get_db)) -> models.Waypoint:
  db_waypoint = crud.create_waypoint(db=db, waypoint=waypoint)
  return model_to_schema(db_waypoint)


@app.post("/waypoints/{id}", response_model=schemas.Waypoint, tags=["update waypoint"])
def update_waypoint(id: int, waypoint: schemas.WaypointUpdate, db: Session = Depends(get_db)):
  db_waypoint = crud.update_waypoint(db, id, waypoint)
  if db_waypoint is None:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return model_to_schema(db_waypoint)


@app.delete("/waypoints/{id}", tags=["delete waypoint"])
def delete_waypoint(id: int, db: Session = Depends(get_db)):
  is_deleted = crud.delete_waypoint(db, id)
  if not is_deleted:
    raise HTTPException(status_code=404, detail=f"Waypoint not found: {id}")
  return Response(status_code=204)
