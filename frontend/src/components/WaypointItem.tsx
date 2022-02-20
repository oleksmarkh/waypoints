import { ChangeEvent, useState } from 'react'

import { Waypoint, WaypointToCreate } from '../models/waypoint'
import { coordToFixed, dateIsoStrToLocaleStr } from '../utils/convert'

import './WaypointItem.scss'

interface WaypointItemProps {
  waypoint: Waypoint | WaypointToCreate;
  onNameInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// TODO:
// * introduce "edit" and "delete" buttons for waypoints with IDs
// * "edit" turns an item into a form, allowing to update waypoint name and submit
export default function WaypointItem(
  { waypoint, onNameInputChange }: WaypointItemProps,
): JSX.Element {
  const [ isEditMode, setIsEditMode ] = useState<boolean>(!('id' in waypoint))
  const handleEditClick = (): void => setIsEditMode(true)
  const { lat, lng } = waypoint.coords

  return (
    <section className="WaypointItem">
      <form className="WaypointItem__form" onSubmit={(event) => event.preventDefault()}>
        <ul className="WaypointItem__attr-list">
          <li className="WaypointItem__attr-item">
            <label className="WaypointItem__attr-label">
              <span className="WaypointItem__attr-caption">name:</span>
              {isEditMode ? (
                <input value={waypoint.name} onChange={onNameInputChange}/>
              ) : (
                <span>{waypoint.name}</span>
              )}
            </label>
          </li>

          <li className="WaypointItem__attr-item">
            <span className="WaypointItem__attr-caption">coords:</span>
            <span>lat={coordToFixed(lat)}, lng={coordToFixed(lng)}</span>
          </li>

          {('created_at' in waypoint) && (
            <li className="WaypointItem__attr-item">
              <span className="WaypointItem__attr-caption">created at:</span>
              <span>{dateIsoStrToLocaleStr(waypoint.created_at)}</span>
            </li>
          )}
        </ul>

        <div className="WaypointItem__button-panel">
          {isEditMode ? (
            <button type="submit">Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}

          {'id' in waypoint && (
            <button>Delete</button>
          )}
        </div>
      </form>
    </section>
  )
}
