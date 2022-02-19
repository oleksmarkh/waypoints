export default {
  map: {
    defaultView: {
      center: [52.52, 13.4], // Berlin
      zoom: 12,
    },

    tileLayer: {
      // @see: https://docs.mapbox.com/api/maps/static-tiles/
      urlTemplate: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{highResolution}?access_token={accessToken}',

      options: {
        tileSize: 512,
        minZoom: 2,
        maxZoom: 18,
        zoomOffset: -1,
        attribution: [
          'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          'Imagery &copy; <a href="https://mapbox.com">Mapbox</a>',
        ].join(', '),
      },
    },
  },
}
