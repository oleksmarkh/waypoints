import React, { useState } from 'react'

import { Waypoint, WaypointToCreate } from '../models/waypoint'
import { coordToFixed, dateIsoStrToLocaleStr } from '../utils/convert'

import './WaypointItem.scss'

interface WaypointItemProps {
  waypoint: Waypoint | WaypointToCreate;
  onNameInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDeleteButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function WaypointItem(
  { waypoint, onNameInputChange, onFormSubmit, onDeleteButtonClick }: WaypointItemProps,
): JSX.Element {
  const [ isEditMode, setIsEditMode ] = useState<boolean>(!('id' in waypoint))
  const { lat, lng } = waypoint.coords
  const handleEditButtonClick = (): void => setIsEditMode(true)
  const handleCloseButtonClick = (): void => setIsEditMode(false)
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    onFormSubmit(event)

    // edit mode should not be exited for "WaypointToCreate"
    if ('id' in waypoint) {
      setIsEditMode(false)
    }
  }

  // Buttons have the "key" prop set, allowing React to distinguish between buttons after rerender.
  return (
    <section className="WaypointItem">
      <form className="WaypointItem__form" onSubmit={handleFormSubmit}>
        <input hidden readOnly name="waypoint-id" value={'id' in waypoint ? waypoint.id : undefined} />

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
            <React.Fragment>
              {'id' in waypoint && (
                <button key="close" type="button" onClick={handleCloseButtonClick}>Close</button>
              )}
              <button key="save" type="submit">Save</button>
            </React.Fragment>
          ) : (
            <button key="edit" type="button" onClick={handleEditButtonClick}>Edit</button>
          )}

          {'id' in waypoint && (
            <button key="delete" type="button" onClick={onDeleteButtonClick}>Delete</button>
          )}
        </div>
      </form>
    </section>
  )
}
