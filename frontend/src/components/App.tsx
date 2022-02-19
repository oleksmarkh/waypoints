import { useCallback, useEffect, useState } from 'react'

import { Waypoint } from '../models/waypoint'
import { retrieveAllWaypoints } from '../api/waypoints'
import Map from './Map'

import './App.scss'

export default function App(): JSX.Element {
  const [ waypointList, setWaypointList ] = useState<Waypoint[]>([])
  const onMapClick = useCallback((event: L.LeafletMouseEvent): void => {
    console.log(`map click, coords:`, event.latlng)
  }, [])

  useEffect(() => {
    retrieveAllWaypoints().then(
      (waypointList) => setWaypointList(waypointList),
      console.error,
    )
  }, [])

  return (
    <main className="App">
      <Map
        waypointList={waypointList}
        onClick={onMapClick}
      />
    </main>
  )
}
