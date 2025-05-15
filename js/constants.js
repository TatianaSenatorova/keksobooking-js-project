import { getPostfix } from './utils.js';

export const TILE_LAYER = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const MAX_MAP_ZOOM = 19;
export const CURRENT_ZOOM = 13;
export const MAP_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const TokioCoordinates = {
  LATITUDE: 35.681729,
  LONGITUDE: 139.753927
};

export const ROUND = 5;

export const specialMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
  popupAnchor: [-3, -30],
});

export const appartmentMarker = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [-3, -30],
});

export const DISABLE_CLASS_FORM = 'ad-form--disabled';
export const DISABLE_CLASS_FILTERS = 'map__filters--disabled';

export const BASE_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const APPARTMENTS_TO_RENDER = 10;
export const DEBOUNCE_DELAY = 500;

export const ERROR_MESSAGE_MAP = 'Не удалось загрузить карту';
export const ERROR_MESSAGE_DATA = 'Не удалось получить данные';

export const ALERT_SHOW_TIME = 3000;

export const INIT_AVATAR_SRC = 'img/muffin-grey.svg';

export const ErrorElementStyles = [
  {
    STYLE: 'position',
    VALUE: 'absolute'
  },
  {
    STYLE: 'top',
    VALUE: '0'
  },
  {
    STYLE: 'width',
    VALUE: '100%'
  },
  {
    STYLE: 'display',
    VALUE: 'flex'
  },
  {
    STYLE: 'justifyContent',
    VALUE: 'center'
  },
  {
    STYLE: 'padding',
    VALUE: '30px'
  },
  {
    STYLE: 'backgroundColor',
    VALUE: '#FFA07A'
  },
  {
    STYLE: 'fontSize',
    VALUE: '30px'
  },
  {
    STYLE: 'fontWeight',
    VALUE: '700'
  },
  {
    STYLE: 'color',
    VALUE: 'white'
  },
];

export const PriceRange = {
  ANY: {
    min: 0,
    max: Infinity,
  },
  MIDDLE: {
    min: 10000,
    max: 50000,
  },
  LOW: {
    min: 0,
    max: 10000,
  },
  HIGH: {
    min: 50000,
    max: Infinity,
  },
};

export const WITHOUT_FILTER = 'any';

export const AllKeysForCard = ['avatar', 'title', 'address', 'price', 'type', 'rooms', 'guests', 'checkin', 'checkout', 'features', 'description', 'photos'];

export const PostfixRooms = ['комнат', 'комната', 'комнаты'];
export const PostfixRoomsIn = ['комнатe', 'комнатаx', 'комнатax'];
export const PostfixGuests = ['гостей', 'гостя', 'гостей'];

export const CapacitySentence = {
  FIRST: '',
  SECOND: (dataKeyRooms) => getPostfix(dataKeyRooms, PostfixRooms),
  THIRD: 'для ',
  FORTH: (dataKeyGuest) => getPostfix(dataKeyGuest, PostfixGuests),
};

export const TimeSentence = {
  FIRST: 'Заезд после ',
  SECOND: () => ', ',
  THIRD: 'выезд до ',
  FORTH: () => ''
};

export const Accomodation = {
  PALACE: {
    lodging: 'Дворец',
    minPrice: 10000
  },
  FLAT:  {
    lodging: 'Квартира',
    minPrice: 1000
  },
  HOTEL: {
    lodging: 'Отель',
    minPrice: 3000
  },
  HOUSE: {
    lodging: 'Дом',
    minPrice: 5000
  },
  BUNGALOW: {
    lodging: 'Бунгало',
    minPrice: 0
  }
};

export const ModelKeys = {
  'HOUSING-TYPE': 'type',
  'HOUSING-PRICE': 'price',
  'HOUSING-ROOMS':'rooms',
  'HOUSING-GUESTS': 'guests',
  'HOUSING-FEATURES':'features',
};

export const KEY_FOR_CHECKBOXES = 'FEATURES';

export const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 100;
export const MAX_PRICE = 100000;

export const sliderInitValues = {
  MAX: 100000,
  MIN: 0,
  STEP: 1,
  CONNECT: 'lower'
};

export const AccomodationOptions = {
  ROOMS:  [
    {
      ROOM_OPTION: '1',
      GUESTS: ['1']
    },
    {
      ROOM_OPTION: '2',
      GUESTS: ['1', '2']
    },
    {
      ROOM_OPTION: '3',
      GUESTS: ['1', '2', '3']
    },
    {
      ROOM_OPTION: '100',
      GUESTS: ['0']
    }
  ],
  GUESTS: [
    {
      GUESTS_OPTION: '1',
      ROOMS: ['1', '2', '3'],
    },
    {
      GUESTS_OPTION: '2',
      ROOMS: ['2', '3'],
    },
    {
      GUESTS_OPTION: '3',
      ROOMS: ['3'],
    },
    {
      GUESTS_OPTION: '0',
      ROOMS: ['100'],
    }
  ]
};

export const AccomodationSentences = {
  ROOMS: 'Возможно размещение ',
  GUESTS: 'Возможно размещение  в '
};

export const IdTemplatesPopup = {
  ERROR: 'error',
  SUCCESS: 'success'
};

