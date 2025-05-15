import {
  ALERT_SHOW_TIME,
  ErrorElementStyles,
  DEBOUNCE_DELAY
} from './constants.js';
import { body } from './dom-elements.js';

let popupElement;

export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const findTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

export const getPostfix = (value, words) =>{
  if((value.toString()).length > 2) {
    value = (value.toString()).slice(-2);
  }
  const number = Math.abs(value);
  if (!Number.isInteger(number)) {
    return '';
  }
  switch (number) {
    case 1:
      return words[1];
    case 0:
    case 2:
    case 3:
    case 4:
    case 5:
      return words[2];
    default:
      return words[0];
  }
};

export const getAllKeys = (object) =>{
  let keys = [];
  for (const key in object) {
    if(object[key]) {
      keys.push(key);
    }
    if (typeof object[key] === 'object') {
      keys = keys.concat(getAllKeys(object[key]));
    }
  }
  return keys;
};

const closePopup = (popup) => {
  popup.remove();
};

export const addTagError = (text, objStyles = ErrorElementStyles, tag = 'div', parent = document.body, alertTime = ALERT_SHOW_TIME) => {
  const element = document.createElement(tag);
  element.textContent = text;
  objStyles.forEach((item) => {element.style[item.STYLE] = item.VALUE;});
  parent.append(element);
  setTimeout(() => {
    closePopup(element);
  }, alertTime);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closePopup(popupElement);
    document.removeEventListener('keydown', onDocumentKeyDown);
  }
};

export const showPopup = (templateId) => {
  const template = findTemplate(templateId);
  popupElement = template.cloneNode(true);
  body.append(popupElement);
  document.addEventListener('keydown', onDocumentKeyDown);
  popupElement.addEventListener('click', () => {
    closePopup(popupElement);
  });
};

export const makeSpaceInNumber = (number) => {
  const changedNumber = [];
  number = number.toString().split('').reverse();
  for(let i = 0; i < number.length; i+=3) {
    changedNumber.push(number.slice(i, i + 3).reverse().join(''));
  }
  return changedNumber.reverse().join(' ');
};
