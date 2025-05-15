import {
  adForm,
  avatarChooser,
  avatarPreview,
  formType,
  formPrice,
  formPriceParent,
  formAddress,
  formAddressParent,
  formCheckin,
  formCheckout,
  guestsSelect,
  roomsSelect,
  roomsSelectParent,
  guestsSelectParent,
  photoChooser,
  photoPreview,
  submitButton,
  resetButton,
} from './dom-elements.js';
import {
  FILE_TYPES,
  Accomodation,
  IdTemplatesPopup,
  TokioCoordinates,
  ROUND,
  INIT_AVATAR_SRC,
} from './constants.js';
import { changeSliderOptions,
  updateSlider,
  resetSlider
} from './slider.js';
import { isValid, resetValidation, getMinPrice } from './validate-form.js';
import { sendData } from './api.js';
import {
  showPopup,
  makeSpaceInNumber
} from './utils.js';
import { resetMap } from './map.js';
import { resetFilters } from './form-filters.js';

formPrice.placeholder = makeSpaceInNumber(Accomodation[formType.value.toUpperCase()].minPrice);
formPrice.type = 'text';
getMinPrice(Accomodation[formType.value.toUpperCase()].minPrice);
formAddress.value = `lat: ${TokioCoordinates.LATITUDE.toFixed(
  ROUND
)}, lng: ${TokioCoordinates.LONGITUDE.toFixed(ROUND)}`;

const setInitAddress = () => {
  formAddress.value = `lat: ${TokioCoordinates.LATITUDE.toFixed(
    ROUND
  )}, lng: ${TokioCoordinates.LONGITUDE.toFixed(ROUND)}`;
};
setInitAddress();

const onUploadPhotoChange = (fileInput, parentForPhotos) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches && fileInput === avatarChooser) {
    const url = URL.createObjectURL(file);
    parentForPhotos.src = url;
  } else if (matches && fileInput === photoChooser) {
    const url = URL.createObjectURL(file);
    parentForPhotos.insertAdjacentHTML(
      'beforeend',
      `<img src=${url} width='70' height='70'>`
    );
  }
};

export const checkIsError = (parent) => {
  if (parent.querySelector('.ad-form__element-validate--error')) {
    parent.querySelector('.ad-form__element-validate--error').style.display =
      'none';
  }
};

export const changeAddress = (coordinates) => {
  checkIsError(formAddressParent);
  formAddress.value = `lat: ${coordinates.lat.toFixed(
    ROUND
  )}, lng: ${coordinates.lng.toFixed(ROUND)}`;
};

export const onAccomodationChange = (target) => {
  if (target === guestsSelect) {
    checkIsError(roomsSelectParent);
  } else {
    checkIsError(guestsSelectParent);
  }
};

const onTypeChange = (target) => {
  const minPrice = Accomodation[target.value.toUpperCase()].minPrice;
  formPrice.value = makeSpaceInNumber(minPrice);
  getMinPrice(minPrice);
  changeSliderOptions(minPrice);
  updateSlider(minPrice);
  checkIsError(formPriceParent);
};

const onTimeChange = (target) => {
  if (target === formCheckin) {
    formCheckout.value = target.value;
  } else {
    formCheckin.value = target.value;
  }
};

const removePhotos = () => {
  avatarPreview.src = INIT_AVATAR_SRC;
  photoPreview.innerHTML = '';
};

const resetForm = () => {
  adForm.reset();
};

const clearForm = () => {
  resetValidation();
  resetForm();
  resetSlider();
  removePhotos();
  resetMap();
  setInitAddress();
};

const onPriceInput = () => {
  if (!formPrice.value.length) {
    formPrice.value = 0;
  }
  formPrice.value = makeSpaceInNumber(formPrice.value.replaceAll(' ', ''));
  const valueToSlider = (formPrice.value).replaceAll(' ', '');
  updateSlider(parseInt(valueToSlider, 10));
};

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        clearForm();
        resetFilters();
        showPopup(IdTemplatesPopup.SUCCESS);
      })
      .catch(() => showPopup(IdTemplatesPopup.ERROR))
      .finally(() => blockSubmitButton(false));
  }
};

const onResetClick = () => {
  clearForm();
};

adForm.addEventListener('change', ({ target }) => {
  switch (target) {
    case avatarChooser:
      onUploadPhotoChange(avatarChooser, avatarPreview);
      break;
    case photoChooser:
      onUploadPhotoChange(photoChooser, photoPreview);
      break;
    case formType:
      onTypeChange(target);
      break;
    case formCheckin:
    case formCheckout:
      onTimeChange(target);
      break;
    case roomsSelect:
    case guestsSelect:
      onAccomodationChange(target);
      break;
    default:
      break;
  }
});

formPrice.addEventListener('input', onPriceInput);

resetButton.addEventListener('click', onResetClick);

adForm.addEventListener('submit', onFormSubmit);
