import config from '../config'
import { Waypoint } from '../models/waypoint'

const { API_URL_ROOT } = config.env
const endpointUrl = `${API_URL_ROOT}/waypoints/`

export async function retrieveAllWaypoints(): Promise<Waypoint[]> {
  const response = await fetch(endpointUrl)
  return response.json() as Promise<Waypoint[]>
}
