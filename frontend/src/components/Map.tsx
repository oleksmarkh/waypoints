import { useEffect, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as L from 'leaflet'

import config from '../config'
import { Waypoint } from '../models/waypoint'
import createMap from '../map/map'
import MarkerPopup from './MarkerPopup'

interface MapProps {
  waypointList: Waypoint[];
  onClick: (event: L.LeafletMouseEvent) => void;
}

function createWaypointMarker(waypoint: Waypoint): L.Marker {
  const marker = L.marker(waypoint.coords)
  marker.bindPopup(renderToStaticMarkup((
    <MarkerPopup
      waypoint={waypoint}
    />
  )))
  return marker
}

export default function Map({ waypointList, onClick }: MapProps): JSX.Element {
  const mapRef = useRef<L.Map | undefined>()
  const markerGroupRef = useRef<L.FeatureGroup | undefined>()

  useEffect(() => {
    const map = createMap(false)
    map.on('click', onClick)
    mapRef.current = map
    return () => { map.remove() }
  }, [ onClick ])

  useEffect(() => {
    if (markerGroupRef.current !== undefined) {
      markerGroupRef.current.remove()
    }

    if (mapRef.current === undefined || waypointList.length === 0) {
      return
    }

    const padding = config.map.fitBoundsPadding as [number, number]
    markerGroupRef.current = L.featureGroup(waypointList.map(createWaypointMarker))
    markerGroupRef.current.addTo(mapRef.current)
    mapRef.current.fitBounds(markerGroupRef.current.getBounds(), { padding })
  }, [ waypointList ])

  return (
    <div id="map" />
  )
}
