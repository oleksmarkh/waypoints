import { useEffect } from 'react'
import * as L from 'leaflet'

import createMap from '../map/map'

export default function Map(): JSX.Element {
  useEffect(() => {
    const map = createMap(false)
    const marker = L.marker(map.getCenter())

    console.log(marker)
    marker.bindPopup(`coords: ${marker.getLatLng().toString()}`).openPopup()
    marker.addTo(map)

    const onMapClick = (event: L.LeafletMouseEvent): void => {
      console.log(`map click, coords:`, event.latlng)
    }
    map.on('click', onMapClick)

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div id="map" />
  )
}
