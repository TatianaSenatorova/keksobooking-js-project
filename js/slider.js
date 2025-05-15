import {
  formPrice,
  slider,
  formType
} from './dom-elements.js';
import {
  sliderInitValues,
  Accomodation
} from './constants.js';
import {
  makeSpaceInNumber
} from './utils.js';

let isMoreThenMaxPrice = false;

noUiSlider.create(slider, {
  range: {
    min: sliderInitValues.MIN,
    max: sliderInitValues.MAX,
  },
  start: Accomodation[formType.value.toUpperCase()].minPrice,
  step: sliderInitValues.STEP,
  connect: sliderInitValues.CONNECT,
  format: {
    to: function (value) {
      return makeSpaceInNumber(value.toFixed(0));
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  if(!isMoreThenMaxPrice) {
    formPrice.value = slider.noUiSlider.get();
  }
});

export const updateSlider = (newPrice) => {
  isMoreThenMaxPrice = newPrice > sliderInitValues.MAX;
  if(!isMoreThenMaxPrice){
    slider.noUiSlider.set(newPrice);
  } else {
    slider.noUiSlider.set(sliderInitValues.MAX);
  }
};

export const changeSliderOptions = (minPrice) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: sliderInitValues.MIN,
      max: sliderInitValues.MAX,
    },
    start: minPrice,
    step: sliderInitValues.STEP,
    connect: sliderInitValues.CONNECT,
    format: {
      to: function (value) {
        return makeSpaceInNumber(value.toFixed(0));
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

export const resetSlider = () => slider.noUiSlider.reset();

