import * as L from 'leaflet'

import { Waypoint } from '../models/waypoint'

export default class WaypointMarker extends L.Marker {
  waypoint: Waypoint

  constructor(latLng: L.LatLngExpression, waypoint: Waypoint, options?: L.MarkerOptions) {
    super(latLng, options)
    this.waypoint = waypoint
  }
}
