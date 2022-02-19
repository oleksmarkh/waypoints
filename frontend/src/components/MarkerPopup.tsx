import { Waypoint } from '../models/waypoint'
import { dateIsoStrToLocaleStr } from '../utils/convert'

import './MarkerPopup.scss'

interface MarkerPopupProps {
  waypoint: Waypoint;
}

export default function MarkerPopup({ waypoint }: MarkerPopupProps): JSX.Element {
  const { lat, lng } = waypoint.coords

  return (
    <ul className="MarkerPopup">
      <li>name: {waypoint.name}</li>
      <li>coords: lat={lat}, lng={lng}</li>
      <li>created at: {dateIsoStrToLocaleStr(waypoint.created_at)}</li>
    </ul>
  )
}
