import { testid } from '../support/utils';

describe('Issue filters', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.createTestAccount();
    cy.visit('/project/board');
  });

  it('filters issues', () => {
    getSearchInput().debounced('type', 'Issue title 1');
    assertIssuesCount(1);
    getSearchInput().debounced('clear');
    assertIssuesCount(3);

    getUserAvatar().click();
    assertIssuesCount(2);
    getUserAvatar().click();
    assertIssuesCount(3);

    getMyOnlyButton().click();
    assertIssuesCount(2);
    getMyOnlyButton().click();
    assertIssuesCount(3);

    getRecentButton().click();
    assertIssuesCount(3);
  });

  const getSearchInput = () => cy.get(testid`board-filters`).find('input');
  const getUserAvatar = () => cy.get(testid`board-filters`).find(testid`avatar:Gaben`);
  const getMyOnlyButton = () => cy.get(testid`board-filters`).contains('Only My Issues');
  const getRecentButton = () => cy.get(testid`board-filters`).contains('Recently Updated');
  const assertIssuesCount = count => cy.get(testid`list-issue`).should('have.length', count);
});
