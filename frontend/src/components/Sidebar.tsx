import { Waypoint, WaypointToCreate } from '../models/waypoint'
import WaypointItem from './WaypointItem'

import './Sidebar.scss'

interface SidebarProps {
  waypointToCreate: WaypointToCreate;
  waypointList: Waypoint[];
}

// TODO:
// * always render an empty waypoint item as a form (name, coords)
// * update its coords when user clicks on the map
export default function Sidebar(
  { waypointToCreate, waypointList }: SidebarProps,
): JSX.Element {
  return (
    <aside className="Sidebar">
      <div className="Sidebar__waypoint-list">
        <h3 className="Sidebar__header">Waypoint to create:</h3>
        <WaypointItem
          key="to-create"
          waypoint={waypointToCreate}
          />

        {waypointList.length > 0 && (
          <h3 className="Sidebar__header">Created waypoints:</h3>
        )}
        {waypointList.map((waypoint) => (
          <WaypointItem
            key={waypoint.id}
            waypoint={waypoint}
          />
        ))}
      </div>
    </aside>
  )
}
