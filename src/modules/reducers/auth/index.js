import types from './types';

const initialState = {
  loading: false,
  country: 'ro',
  city: {
    id: 0,
    name: '',
    status: false,
  },
  logged: false,
  user: {
    token: null,
    email: '',
    name: '',
    restaurantId: 'MFR0LE79KX',
    city: {
      id: 0,
      name: '',
      status: false,
    },
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case types.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.SET_USER_CITY:
      return {
        ...state,
        user: action.payload,
      };
    case types.DELETE_USER:
      return {
        ...state,
        logged: false,
        user: action.payload,
      };
    case types.SET_LOGGED:
      return {
        ...state,
        logged: true,
      };

    default:
      return state;
  }
}
