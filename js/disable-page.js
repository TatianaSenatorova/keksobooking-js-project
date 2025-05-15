import {
  adForm,
  adFormFieldsets,
  filtersForm,
  mapFilterSelects,
  filtersFeatures
} from './dom-elements.js';
import {
  DISABLE_CLASS_FORM,
  DISABLE_CLASS_FILTERS
} from './constants.js';

const disableForm = (form, fieldSets, disableClass, isDisable = true, checkboxes) => {
  if(isDisable) {
    form.classList.add(disableClass);
  } else{
    form.classList.remove(disableClass);
  }
  fieldSets.forEach((fildset) => {
    fildset.disabled = isDisable;
  });
  if(checkboxes) {
    checkboxes.disabled = isDisable;
  }
};

const disablePage = (isDisable = true) => {
  disableForm(adForm, adFormFieldsets, DISABLE_CLASS_FORM, isDisable, filtersFeatures);
  disableForm(filtersForm, mapFilterSelects, DISABLE_CLASS_FILTERS, isDisable);
};


export { disablePage };
