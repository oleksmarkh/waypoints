import config from '../config'
import { Waypoint } from '../models/waypoint'

const { API_URL_ROOT } = config.env
const endpointUrl = `${API_URL_ROOT}/waypoints/`

export function retrieveAllWaypoints(): Promise<Waypoint[]> {
  // possible errors: network, API, JSON parsing
  return fetch(endpointUrl)
    .then((response) => response.json() as Promise<Waypoint[]>)
}

// TODO: update and delete
