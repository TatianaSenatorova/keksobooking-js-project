import {
  adForm,
  formTitle,
  formPrice,
  formAddress,
  roomsSelect,
  guestsSelect
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  PostfixGuests,
  PostfixRoomsIn,
  AccomodationOptions,
  AccomodationSentences,
  ROUND
} from './constants.js';
import {
  getPostfix,
  makeSpaceInNumber
} from './utils.js';

let capacityCurrentIndex;
let allowed = [];
let address = {};
let minPrice;

export const getAddress = (coordinates) => {
  address = structuredClone(coordinates);
};

export const getMinPrice = (price) => {
  minPrice = price;
};


const pristine = new Pristine(
  adForm,
  {
    classTo: 'ad-form__element-validate',
    errorTextClass: 'ad-form__element-validate--error',
    errorTextParent: 'ad-form__element-validate',
  },
);

const validateTitle = (value) =>
  value.length >= MIN_TITLE_LENGTH &&
value.length <= MAX_TITLE_LENGTH;
const getTitleErrorMessage = () =>
  `Mинимальная длина заголовка ${MIN_TITLE_LENGTH} символов, максимальная ${MAX_TITLE_LENGTH}`;

const validatePrice = (value) =>{
  const currentValue = parseInt(value.replaceAll(' ', ''), 10);
  return currentValue >= minPrice && currentValue <= MAX_PRICE;
};

const getPriceErrorMessage = () => `Min цена ${makeSpaceInNumber(minPrice)}. Max цена ${makeSpaceInNumber(MAX_PRICE)} руб.`;

const validateAddress = (value) => value === `lat: ${address.lat.toFixed(ROUND)}, lng: ${address.lng.toFixed(ROUND)}`;
const getAddressErrorMessage = () => 'Переместите красную метку на карте на адрес жилья';

const validateAccomodation = (value, linkedSelectValue, arrayToCheck, chosenOption, linkedOption) => {
  capacityCurrentIndex  = arrayToCheck.findIndex((option) => option[chosenOption] ===
   value);
  allowed = (arrayToCheck[capacityCurrentIndex][linkedOption]).slice();
  return allowed.includes(linkedSelectValue);};

const getAccomodationErrorMessage = (checkingOption, postfixesArray) => {
  let message = AccomodationSentences[checkingOption];
  for(let i = 0; i < allowed.length; i++) {
    message += `${allowed[i]} , `;
  }
  const lastNumber = allowed.pop();
  message = message.replace(/,\s*$/, '') + getPostfix(lastNumber, postfixesArray);
  return message;
};

const validateGuests = (value) => validateAccomodation(value, roomsSelect.value, AccomodationOptions.GUESTS, 'GUESTS_OPTION', 'ROOMS');
const getGuestsErrorMessage = () => getAccomodationErrorMessage('GUESTS', PostfixRoomsIn);

const validateRooms = (value) => validateAccomodation(value, guestsSelect.value, AccomodationOptions.ROOMS, 'ROOM_OPTION', 'GUESTS');
const getRoomsErrorMessage = () => getAccomodationErrorMessage('ROOMS', PostfixGuests);

pristine.addValidator(
  formTitle,
  validateTitle,
  getTitleErrorMessage
);

pristine.addValidator(
  formPrice,
  validatePrice,
  getPriceErrorMessage
);

pristine.addValidator(
  formAddress,
  validateAddress,
  getAddressErrorMessage
);

pristine.addValidator(
  roomsSelect,
  validateRooms,
  getRoomsErrorMessage
);

pristine.addValidator(
  guestsSelect,
  validateGuests,
  getGuestsErrorMessage
);

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
