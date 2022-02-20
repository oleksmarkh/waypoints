import { useCallback, useEffect, useMemo, useState } from 'react'

import config from '../config'
import { Waypoint, WaypointToCreate } from '../models/waypoint'
import WaypointMarker from '../map/WaypointMarker'
import { retrieveAllWaypoints } from '../api/waypoints'
import Sidebar from './Sidebar'
import Map from './Map'

import './App.scss'

export default function App(): JSX.Element {
  const defaultWaypointToCreate: WaypointToCreate = useMemo(() => ({
    name: '',
    coords: config.map.defaultView.center,
  }), [])
  const [ waypointToCreate, setWaypointToCreate ] = useState<WaypointToCreate>(defaultWaypointToCreate)
  const [ waypointList, setWaypointList ] = useState<Waypoint[]>([])
  const onMapClick = useCallback((event: L.LeafletMouseEvent): void => {
    console.log(`map click, coords:`, event.latlng)
    setWaypointToCreate((prevWaypointToCreate) => ({
      ...prevWaypointToCreate,
      coords: event.latlng,
    }))
  }, [])
  const onMarkerClick = useCallback((event: L.LeafletMouseEvent): void => {
    const marker = event.target as WaypointMarker
    console.log(`marker click, waypoint:`, marker.waypoint)
    // not implemented, see "Further improvements -> Frontend -> Interactivity..." in README
  }, [])

  useEffect(() => {
    retrieveAllWaypoints().then(setWaypointList, console.error)
  }, [])

  return (
    <main className="App">
      <Sidebar
        waypointToCreate={waypointToCreate}
        waypointList={waypointList}
        />
      <Map
        waypointToCreate={waypointToCreate}
        waypointList={waypointList}
        onMapClick={onMapClick}
        onMarkerClick={onMarkerClick}
      />
    </main>
  )
}
