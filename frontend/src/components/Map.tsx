import { useEffect } from 'react'

import createMap from '../map/map'

export default function Map(): JSX.Element {
  useEffect(() => {
    const map = createMap(false)

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div id="map" />
  )
}
