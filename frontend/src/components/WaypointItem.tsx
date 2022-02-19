import { Waypoint } from '../models/waypoint'
import { dateIsoStrToLocaleStr } from '../utils/convert'

import './WaypointItem.scss'

interface WaypointItemProps {
  waypoint: Waypoint;
}

export default function WaypointItem({ waypoint }: WaypointItemProps): JSX.Element {
  const { lat, lng } = waypoint.coords

  return (
    <section className="WaypointItem">
      <ul className="WaypointItem__attr-list">
        <li>name: {waypoint.name}</li>
        <li>coords: lat={lat}, lng={lng}</li>
        <li>created at: {dateIsoStrToLocaleStr(waypoint.created_at)}</li>
      </ul>
    </section>
  )
}
