import * as L from 'leaflet'

import config from '../config'

import './InfoBox.scss'

export default class InfoBox extends L.Control {
  public onAdd(): HTMLElement {
    const element = L.DomUtil.create('aside', 'InfoBox')
    element.innerHTML = config.map.infoBox.message
    return element
  }
}
