import { Waypoint, WaypointToCreate } from '../models/waypoint'
import WaypointItem from './WaypointItem'

import './Sidebar.scss'

interface SidebarProps {
  waypointToCreate: WaypointToCreate;
  waypointList: Waypoint[];
  onWaypointNameChange: (waypoint: Waypoint | WaypointToCreate, name: string) => void;
}

export default function Sidebar(
  { waypointToCreate, waypointList, onWaypointNameChange }: SidebarProps,
): JSX.Element {
  return (
    <aside className="Sidebar">
      <div className="Sidebar__waypoint-list">
        <h3 className="Sidebar__header">Waypoint to create:</h3>
        <WaypointItem
          key="to-create"
          waypoint={waypointToCreate}
          onNameInputChange={(event) => onWaypointNameChange(waypointToCreate, event.target.value)}
        />

        {waypointList.length > 0 && (
          <h3 className="Sidebar__header">Created waypoints:</h3>
        )}
        {waypointList.map((waypoint) => (
          <WaypointItem
            key={waypoint.id}
            waypoint={waypoint}
            onNameInputChange={(event) => onWaypointNameChange(waypoint, event.target.value)}
          />
        ))}
      </div>
    </aside>
  )
}
