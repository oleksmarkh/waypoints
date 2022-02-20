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

export function updateNameInList(
  waypointList: Waypoint[], waypoint: Waypoint, name: string,
): Waypoint[] {
  return waypointList.map((w) => w === waypoint ? ({ ...w, name }) : w)
}
