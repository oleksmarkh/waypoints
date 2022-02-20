import { Waypoint, WaypointToCreate } from '../models/waypoint'
import { coordToFixed, dateIsoStrToLocaleStr } from '../utils/convert'

import './WaypointItem.scss'

interface WaypointItemProps {
  waypoint: Waypoint | WaypointToCreate;
}

// TODO:
// * introduce "edit" and "delete" buttons
// * "edit" turns an item into a form, allowing to update waypoint name and submit
export default function WaypointItem({ waypoint }: WaypointItemProps): JSX.Element {
  const { lat, lng } = waypoint.coords

  return (
    <section className="WaypointItem">
      <ul className="WaypointItem__attr-list">
        <li>name: {waypoint.name}</li>
        <li>coords: lat={coordToFixed(lat)}, lng={coordToFixed(lng)}</li>

        {('created_at' in waypoint) && (
          <li>created at: {dateIsoStrToLocaleStr(waypoint.created_at)}</li>
        )}
      </ul>
    </section>
  )
}
