import { combineReducers } from 'redux';
import * as actions from './actions';

const initialState = {
  data: {
    Countries: [],
    Global: {}
  },
  isLoading: false,
  error: '',
  selectedRow: {
    data: []
  }
}

const generateGlobalRow = dataGlobal =>
  ({
    label: 'Global',
    data: Object.keys(dataGlobal).map(key => ({
      label: key,
      value: dataGlobal[key]
    }))
  })

function app(state = initialState, action) {
  const { type, data, error, row } = action;

  switch(type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        isLoading: true
      };
    case actions.DATA_LOADED:
      return {
        ...state,
        data,
        error: null,
        isLoading: false,
        selectedRow: generateGlobalRow(data.Global)
      };
    case actions.DATA_ERROR:
      return {
        ...state,
        error,
        isLoading: false
      };
    case actions.CHANGE_SELECTED_ROW:
      const country = state.data.Countries[state.data.Countries.findIndex(country => country.Country === row[0])];
      const countryPlucked = (({
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered
      }) => ({
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered
      }))(country);

      return {
        ...state,
        selectedRow: {
          label: row[0],
          data: Object.keys(countryPlucked).map(key => ({
            label: key,
            value: countryPlucked[key]
          })) 
        }
      }
    case actions.EMPTY_SELECTED_ROW:
      return {
        ...state,
        selectedRow: generateGlobalRow(state.data.Global)
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ app });

export default rootReducer;
