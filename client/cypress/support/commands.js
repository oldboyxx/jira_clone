import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '@4tw/cypress-drag-drop';

import { objectToQueryString } from 'shared/utils/url';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';

import { testid } from './utils';

Cypress.Commands.add('selectOption', (selectName, ...optionLabels) => {
  optionLabels.forEach(optionLabel => {
    cy.get(testid`select:${selectName}`).click('bottomRight');
    cy.get(testid`select-option:${optionLabel}`).click();
  });
});

Cypress.Commands.add('selectShouldContain', (selectName, ...optionLabels) => {
  optionLabels.forEach(optionLabel => {
    cy.get(testid`select:${selectName}`).should('contain', optionLabel);
  });
});

// We don't want to waste time when running tests on cypress waiting for debounced
// inputs. We can use tick() to speed up time and trigger onChange immediately.
Cypress.Commands.add('debounced', { prevSubject: true }, (input, action, value) => {
  cy.clock();
  cy.wrap(input)[action](value);
  cy.tick(1000);
});

// Sometimes cypress fails to properly wait for api requests to finish which results
// in flaky tests, and in those cases we need to explicitly tell it to wait
// https://docs.cypress.io/guides/guides/network-requests.html#Flake
Cypress.Commands.add('waitForXHR', (method, url, funcThatTriggersXHR) => {
  const alias = method + url;
  cy.server();
  cy.route(method, url).as(alias);
  funcThatTriggersXHR();
  cy.wait(`@${alias}`);
});

// We're using optimistic updates (not waiting for API response before updating
// the local data and UI) in a lot of places in the app. That's why we want to assert
// both the immediate local UI change in the first assert, and if the change was
// successfully persisted by the API in the second assert after page reload
Cypress.Commands.add('assertReloadAssert', assertFunc => {
  assertFunc();
  cy.reload();
  assertFunc();
});

Cypress.Commands.add('apiRequest', (method, url, variables = {}, options = {}) => {
  cy.request({
    method,
    url: `${Cypress.env('apiBaseUrl')}${url}`,
    qs: method === 'GET' ? objectToQueryString(variables) : undefined,
    body: method !== 'GET' ? variables : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
    },
    ...options,
  });
});

Cypress.Commands.add('resetDatabase', () => {
  cy.apiRequest('DELETE', '/test/reset-database');
});

Cypress.Commands.add('createTestAccount', () => {
  cy.apiRequest('POST', '/test/create-account').then(response => {
    storeAuthToken(response.body.authToken);
  });
});
