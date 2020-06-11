export const LOAD_DATA = 'LOAD_DATA';
const loadData = () => ({ type: LOAD_DATA });

export const DATA_LOADED = 'DATA_LOADED';
const dataLoaded = (data) => ({ type: DATA_LOADED, data });

export const DATA_ERROR = 'DATA_ERROR';
const dataError = (error) => ({ type: DATA_ERROR, error });

export function fetchData() {
  return dispatch => {
    dispatch(loadData());

    const url = 'https://api.covid19api.com/summary';

    fetch(url)
      .then(
        res => res.json(),
        e => dispatch(dataError('Error'))
      )
      .then(data => {
        if (!data) {
          dispatch(dataError('Empty result set'));
        } else {
          dispatch(dataLoaded(data));
        }
      })
  }
}

export const CHANGE_SELECTED_ROW = 'CHANGE_SELECTED_ROW';
export const changeSelectedRow = (row) => ({ type: CHANGE_SELECTED_ROW, row });

export const EMPTY_SELECTED_ROW = 'EMPTY_SELECTED_ROW';
export const emptySelectedRow = (row) => ({ type: EMPTY_SELECTED_ROW });
