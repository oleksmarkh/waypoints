import * as L from 'leaflet';

import config from '../config';

import 'leaflet/dist/leaflet.css';
import './map.scss';

const {MAPBOX_ACCESS_TOKEN: accessToken} = process.env;

interface MapTileLayerOptions extends L.TileLayerOptions {
  accessToken: string;
  id: 'mapbox/light-v10' | 'mapbox/dark-v10';
  highResolution: '@2x' | '';
}

function getTileLayerOptions(isDarkMode: boolean): MapTileLayerOptions {
  if (accessToken === undefined) {
    throw new Error('MAPBOX_ACCESS_TOKEN env var is not set');
  }

  const { options } = config.map.tileLayer;

  return {
    ...options,
    accessToken,
    id: isDarkMode
      ? 'mapbox/dark-v10'
      : 'mapbox/light-v10',
    highResolution: window.devicePixelRatio === 1
      ? ''
      : '@2x',
  };
}

export default function createMap(isDarkMode: boolean): L.Map {
  const { defaultView: { center, zoom }, tileLayer: { urlTemplate } } = config.map;
  const map = L.map('map').setView(center as [number, number], zoom);
  const tileLayer = L.tileLayer(urlTemplate, getTileLayerOptions(isDarkMode));
  tileLayer.addTo(map);
  return map;
}
