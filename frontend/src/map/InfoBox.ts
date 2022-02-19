import * as L from 'leaflet'

import './InfoBox.scss'

export default class InfoBox extends L.Control {
  public onAdd(): HTMLElement {
    const element = L.DomUtil.create('aside', 'InfoBox')
    element.innerHTML = 'click on the map to choose next waypoint coords'
    return element
  }
}
