import config from '../config'
import { Waypoint } from '../models/waypoint'

const { API_URL_ROOT } = config.env
const endpointUrl = `${API_URL_ROOT}/waypoints/`

export async function retrieveAllWaypoints(): Promise<Waypoint[]> {
  try {
    const response = await fetch(endpointUrl)
    return await response.json() as Waypoint[]
  } catch (error) {
    // possible errors: network, API, JSON parsing
    console.error(error)
  }
  return []
}

// TODO: update and delete
