import { createSelector } from 'reselect';

const appSelector = state => state.app;

export const countriesSelector = createSelector(
  appSelector,
  app => app.data.Countries
);

export const selectedRowSelector = createSelector(
  appSelector,
  app => app.selectedRow
);

export const globalRowSelector = createSelector(
  appSelector,
  app => ({
    label: 'Global',
    data: Object.keys(app.data.Global).map(key => ({
      label: key,
      value: app.data.Global[key]
    }))
  })
)

export const tableDataSelector = createSelector(
  appSelector,
  app => app.data.Countries.map(country => [
    country.Country,
    country.TotalConfirmed,
    country.TotalDeaths,
    country.TotalRecovered
  ])
)
