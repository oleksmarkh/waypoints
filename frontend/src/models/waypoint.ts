interface Coords {
  lat: number;
  lng: number;
}

export interface WaypointToCreate {
  name: string;
  coords: Coords;
}

export interface Waypoint extends WaypointToCreate {
  id: number;
  created_at: string;
}
