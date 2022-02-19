import { Waypoint } from '../models/waypoint'
import WaypointItem from './WaypointItem'

import './Sidebar.scss'

interface SidebarProps {
  waypointList: Waypoint[];
}

// TODO:
// * always render an empty waypoint item as a form (name, coords)
// * update its coords when user clicks on the map
export default function Sidebar({ waypointList }: SidebarProps): JSX.Element {
  return (
    <aside className="Sidebar">
      <div className="Sidebar__waypoint-list">
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
