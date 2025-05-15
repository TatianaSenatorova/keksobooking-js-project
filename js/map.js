import {
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates,
  specialMarker,
  appartmentMarker,
  APPARTMENTS_TO_RENDER
} from './constants.js';
import { createCard } from './card.js';
import { getAddress } from './validate-form.js';


let map;
let markerGroup;
let mainMarker;

export const getMap = async () => {
  map = await L.map('map-canvas');

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION,
  }).addTo(map);

  map.setView(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    CURRENT_ZOOM
  );

  mainMarker = L.marker(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    { icon: specialMarker, draggable: true }
  ).addTo(map);

  getAddress(mainMarker.getLatLng());

  markerGroup = L.layerGroup().addTo(map);
};

export const getLatLng = (cb) => {
  mainMarker.on('move', () => {
    const coordinates = mainMarker.getLatLng();
    cb(coordinates);
  }
  );
};

const clearMarkerGroup = () => {
  markerGroup.clearLayers();
};

export const renderMarkers = (appartmentsArray) => {
  clearMarkerGroup();
  appartmentsArray.slice(0, APPARTMENTS_TO_RENDER).map((appartment) => {
    const marker = L.marker(
      [appartment.location.lat, appartment.location.lng],
      { icon: appartmentMarker }
    ).addTo(markerGroup);
    marker.bindPopup(() => createCard(appartment));
  });
};

export const resetMap = () => {
  mainMarker.setLatLng({
    lat: TokioCoordinates.LATITUDE,
    lng: TokioCoordinates.LONGITUDE,
  });
  map.setView(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    CURRENT_ZOOM
  );
};
