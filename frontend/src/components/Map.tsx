import { useEffect, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as L from 'leaflet'

import config from '../config'
import { Waypoint, WaypointToCreate } from '../models/waypoint'
import createMap from '../map/map'
import WaypointMarker from '../map/WaypointMarker'
import InfoBox from '../map/InfoBox'
import MarkerPopup from './MarkerPopup'

interface MapProps {
  waypointToCreate: WaypointToCreate;
  waypointList: Waypoint[];
  onMapClick: (event: L.LeafletMouseEvent) => void;
  onMarkerClick: (event: L.LeafletMouseEvent) => void;
}

function createWaypointMarker(
  waypoint: Waypoint, onClick: (event: L.LeafletMouseEvent) => void,
): WaypointMarker {
  const marker = new WaypointMarker(waypoint.coords, waypoint)
  marker.on('click', onClick)
  marker.bindPopup(renderToStaticMarkup(<MarkerPopup waypoint={waypoint} />))
  return marker
}

export default function Map(
  { waypointToCreate, waypointList, onMapClick, onMarkerClick }: MapProps,
): JSX.Element {
  const mapRef = useRef<L.Map | undefined>()
  const circleMarkerRef = useRef<L.CircleMarker>(L.circleMarker(waypointToCreate.coords))
  const markerGroupRef = useRef<L.FeatureGroup | undefined>()

  useEffect(() => {
    const map = createMap(false)
    const infoBox = new InfoBox(config.map.infoBox.options as L.ControlOptions)

    infoBox.addTo(map)
    circleMarkerRef.current.addTo(map)
    mapRef.current = map

    return () => { map.remove() }
  }, [])

  useEffect(() => {
    if (mapRef.current !== undefined) {
      mapRef.current.off('click')
      mapRef.current.on('click', onMapClick)
    }
  }, [ onMapClick ])

  useEffect(() => {
    circleMarkerRef.current.setLatLng(waypointToCreate.coords)
  }, [ waypointToCreate ])

  useEffect(() => {
    if (markerGroupRef.current !== undefined) {
      markerGroupRef.current.remove()
    }

    markerGroupRef.current = L.featureGroup(waypointList.map(
      (waypoint) => createWaypointMarker(waypoint, onMarkerClick),
    ))

    if (mapRef.current !== undefined) {
      markerGroupRef.current.addTo(mapRef.current)
    }
  }, [ waypointList, onMarkerClick ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { code, ctrlKey, shiftKey } = event

      if (!(ctrlKey && shiftKey && code === 'KeyF')) { return }
      if (mapRef.current === undefined || markerGroupRef.current === undefined) { return }

      const padding = config.map.fitBoundsPadding as [number, number]
      const bounds = markerGroupRef.current.getBounds()

      bounds.extend(circleMarkerRef.current.getLatLng())
      mapRef.current.fitBounds(bounds, { padding })
    }

    document.addEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div id="map" />
  )
}
