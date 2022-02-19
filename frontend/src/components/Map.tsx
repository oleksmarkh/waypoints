import { useEffect, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as L from 'leaflet'

import config from '../config'
import { Waypoint } from '../models/waypoint'
import createMap from '../map/map'
import WaypointMarker from '../map/WaypointMarker'
import InfoBox from '../map/InfoBox'
import MarkerPopup from './MarkerPopup'

interface MapProps {
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
  { waypointList, onMapClick, onMarkerClick }: MapProps,
): JSX.Element {
  const mapRef = useRef<L.Map | undefined>()
  const markerGroupRef = useRef<L.FeatureGroup | undefined>()

  useEffect(() => {
    const map = createMap(false)
    const infoBox = new InfoBox(config.map.infoBox.options as L.ControlOptions)

    infoBox.addTo(map)
    map.on('click', onMapClick)
    mapRef.current = map

    return () => { map.remove() }
  }, [ onMapClick ])

  useEffect(() => {
    if (markerGroupRef.current !== undefined) {
      markerGroupRef.current.remove()
    }

    if (mapRef.current === undefined || waypointList.length === 0) {
      return
    }

    const padding = config.map.fitBoundsPadding as [number, number]
    markerGroupRef.current = L.featureGroup(waypointList.map(
      (waypoint) => createWaypointMarker(waypoint, onMarkerClick),
    ))
    markerGroupRef.current.addTo(mapRef.current)
    mapRef.current.fitBounds(markerGroupRef.current.getBounds(), { padding })
  }, [ waypointList, onMarkerClick ])

  return (
    <div id="map" />
  )
}
