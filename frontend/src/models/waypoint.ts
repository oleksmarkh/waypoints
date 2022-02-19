interface Coords {
  lat: number;
  lng: number;
}

export interface Waypoint {
  id: number;
  name: string;
  coords: Coords;
  created_at: string;
}
