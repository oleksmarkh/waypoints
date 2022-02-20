import { useCallback, useEffect, useMemo, useState } from 'react'

import config from '../config'
import { Waypoint, WaypointToCreate } from '../models/waypoint'
import { updateInList, prependToList, deleteFromList } from '../utils/list'
import WaypointMarker from '../map/WaypointMarker'
import { retrieveAllWaypoints, createWaypoint, updateWaypoint, deleteWaypoint } from '../api/waypoints'
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
      setWaypointList((prevWaypointList) => updateInList<Waypoint>(prevWaypointList, waypoint, { name }))
    } else {
      setWaypointToCreate((prevWaypointToCreate) => ({ ...prevWaypointToCreate, name }))
    }
  }

  const handleWaypointFormSubmit = (
    event: React.FormEvent<HTMLFormElement>, waypoint: Waypoint | WaypointToCreate,
  ): void => {
    event.preventDefault()

    if ('id' in waypoint) {
      updateWaypoint(waypoint).catch(console.error)
    } else {
      createWaypoint(waypoint).then(
        (createdWaypoint) => {
          setWaypointToCreate(defaultWaypointToCreate)
          setWaypointList((prevWaypointList) => prependToList<Waypoint>(prevWaypointList, createdWaypoint))
        },
        console.error,
      )
    }
  }

  // the first argument (event) is not used, but it's there for interface consistency among handlers
  const handleWaypointDeleteButtonClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>, waypoint: Waypoint,
  ): void => {
    deleteWaypoint(waypoint).then(
      () => setWaypointList((prevWaypointList) => deleteFromList<Waypoint>(prevWaypointList, waypoint)),
      console.error,
    )
  }

  const handleMapClick = useCallback((event: L.LeafletMouseEvent): void => {
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
