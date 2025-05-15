import { disablePage } from './disable-page.js';
import {
  getMap,
  renderMarkers,
  getLatLng
} from './map.js';
import { getData } from './api.js';
import { addTagError } from './utils.js';
import {
  ERROR_MESSAGE_MAP,
  ERROR_MESSAGE_DATA
} from './constants.js';
import { setFilters} from './form-filters.js';
import { changeAddress } from './form-advertisement.js';
import {getAddress} from './validate-form.js';

disablePage();

getMap()
  .then(() => {
    getData()
      .then((appartments)=>{
        disablePage(false);
        renderMarkers(appartments);
        setFilters(appartments);
        getLatLng((coordinates) =>
          (changeAddress(coordinates),
          getAddress(coordinates)),
        );
      })
      .catch(() => {
        addTagError(ERROR_MESSAGE_DATA);
      });
  })
  .catch(() => {
    addTagError(ERROR_MESSAGE_MAP);
  });

