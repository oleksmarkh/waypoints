import config from '../config'
import { Waypoint, WaypointToCreate } from '../models/waypoint'
import { get, post, remove } from '../utils/http'

const { API_URL_ROOT } = config.env
const endpointUrl = `${API_URL_ROOT}/waypoints/`

// All transport methods return promises transparently,
// allowing callers to catch/log possible errors: network, API, JSON parsing.

export function retrieveAllWaypoints(): Promise<Waypoint[]> {
  return get<Waypoint[]>(endpointUrl)
}

export function createWaypoint(waypointToCreate: WaypointToCreate): Promise<Waypoint> {
  return post<WaypointToCreate, Waypoint>(endpointUrl, waypointToCreate)
}

export function updateWaypoint(waypoint: Waypoint): Promise<Waypoint> {
  return post<Waypoint, Waypoint>(`${endpointUrl}${waypoint.id}`, waypoint)
}

export function deleteWaypoint(waypoint: Waypoint): Promise<Response> {
  return remove(`${endpointUrl}${waypoint.id}`)
}
