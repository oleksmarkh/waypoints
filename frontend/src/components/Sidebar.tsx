import { Waypoint, WaypointToCreate } from '../models/waypoint'
import WaypointItem from './WaypointItem'

import './Sidebar.scss'

interface SidebarProps {
  waypointToCreate: WaypointToCreate;
  waypointList: Waypoint[];
  onWaypointNameInputChange: (
    event: React.ChangeEvent<HTMLInputElement>, waypoint: Waypoint | WaypointToCreate,
  ) => void;
  onWaypointFormSubmit: (
    event: React.FormEvent<HTMLFormElement>, waypoint: Waypoint | WaypointToCreate,
  ) => void;
  onWaypointDeleteButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>, waypoint: Waypoint,
  ) => void;
}

export default function Sidebar({
  waypointToCreate, waypointList,
  onWaypointNameInputChange: onWaypointNameChange, onWaypointFormSubmit, onWaypointDeleteButtonClick,
}: SidebarProps): JSX.Element {
  return (
    <aside className="Sidebar">
      <div className="Sidebar__waypoint-list">
        <h3 className="Sidebar__header">Waypoint to create:</h3>
        <WaypointItem
          key="to-create"
          waypoint={waypointToCreate}
          onNameInputChange={(event) => onWaypointNameChange(event, waypointToCreate)}
          onFormSubmit={(event) => onWaypointFormSubmit(event, waypointToCreate)}
        />

        {waypointList.length > 0 && (
          <h3 className="Sidebar__header">Created waypoints:</h3>
        )}
        {waypointList.map((waypoint) => (
          <WaypointItem
            key={waypoint.id}
            waypoint={waypoint}
            onNameInputChange={(event) => onWaypointNameChange(event, waypoint)}
            onFormSubmit={(event) => onWaypointFormSubmit(event, waypoint)}
            onDeleteButtonClick={(event) => onWaypointDeleteButtonClick(event, waypoint)}
          />
        ))}
      </div>
    </aside>
  )
}
