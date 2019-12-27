import history from 'browserHistory';
import { queryStringToObject, addToQueryString, omitFromQueryString } from 'shared/utils/url';

const open = param =>
  history.push({
    pathname: history.location.pathname,
    search: addToQueryString(history.location.search, { [`modal-${param}`]: true }),
  });

const close = param =>
  history.push({
    pathname: history.location.pathname,
    search: omitFromQueryString(history.location.search, [`modal-${param}`]),
  });

const isOpen = param => !!queryStringToObject(history.location.search)[`modal-${param}`];

export const createQueryParamModalHelpers = param => ({
  open: () => open(param),
  close: () => close(param),
  isOpen: () => isOpen(param),
});
