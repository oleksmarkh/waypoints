import { useCallback, useEffect, useMemo, useState } from 'react'

import config from '../config'
import { Waypoint, WaypointToCreate, updateNameInList } from '../models/waypoint'
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

  const handleWaypointNameChange = (
    event: React.ChangeEvent<HTMLInputElement>, waypoint: Waypoint | WaypointToCreate,
  ): void => {
    const { value: name } = event.target

    if ('id' in waypoint) {
      setWaypointList((prevWaypointList) => updateNameInList(prevWaypointList, waypoint, name))
    } else {
      setWaypointToCreate((prevWaypointToCreate) => ({ ...prevWaypointToCreate, name }))
    }
  }

  const handleWaypointFormSubmit = (
    event: React.FormEvent<HTMLFormElement>, waypoint: Waypoint | WaypointToCreate,
  ): void => {
    event.preventDefault()
    console.log('form submit, waypoint:', waypoint)
  }

  // the first argument (event) is not used, but it's there for interface consistency among handlers
  const handleWaypointDeleteButtonClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>, waypoint: Waypoint,
  ): void => {
    console.log('delete waypoint:', waypoint)
  }

  const handleMapClick = useCallback((event: L.LeafletMouseEvent): void => {
    // console.log('map click, coords:', event.latlng)
    setWaypointToCreate((prevWaypointToCreate) => ({
      ...prevWaypointToCreate,
      coords: event.latlng,
    }))
  }, [])

  const handleMarkerClick = useCallback((event: L.LeafletMouseEvent): void => {
    const marker = event.target as WaypointMarker
    console.log('marker click, waypoint:', marker.waypoint)
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
        onWaypointNameInputChange={handleWaypointNameChange}
        onWaypointFormSubmit={handleWaypointFormSubmit}
        onWaypointDeleteButtonClick={handleWaypointDeleteButtonClick}
      />
      <Map
        waypointToCreate={waypointToCreate}
        waypointList={waypointList}
        onMapClick={handleMapClick}
        onMarkerClick={handleMarkerClick}
      />
    </main>
  )
}
