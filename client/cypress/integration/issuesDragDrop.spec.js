import { KeyCodes } from 'shared/constants/keyCodes';

import { testid } from '../support/utils';

describe('Issues drag & drop', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.createTestAccount();
    cy.visit('/project/board');
  });

  it('moves issue between different lists', () => {
    cy.get(testid`board-list:backlog`).should('contain', firstIssueTitle);
    cy.get(testid`board-list:selected`).should('not.contain', firstIssueTitle);
    moveFirstIssue(KeyCodes.ARROW_RIGHT);

    cy.assertReloadAssert(() => {
      cy.get(testid`board-list:backlog`).should('not.contain', firstIssueTitle);
      cy.get(testid`board-list:selected`).should('contain', firstIssueTitle);
    });
  });

  it('moves issue within a single list', () => {
    getIssueAtIndex(0).should('contain', firstIssueTitle);
    getIssueAtIndex(1).should('contain', secondIssueTitle);
    moveFirstIssue(KeyCodes.ARROW_DOWN);

    cy.assertReloadAssert(() => {
      getIssueAtIndex(0).should('contain', secondIssueTitle);
      getIssueAtIndex(1).should('contain', firstIssueTitle);
    });
  });

  const firstIssueTitle = 'Issue title 1';
  const secondIssueTitle = 'Issue title 2';

  const getIssueAtIndex = index => cy.get(testid`list-issue`).eq(index);

  const moveFirstIssue = directionKeyCode => {
    cy.waitForXHR('PUT', '/issues/**', () => {
      getIssueAtIndex(0)
        .focus()
        .trigger('keydown', { keyCode: KeyCodes.SPACE })
        .trigger('keydown', { keyCode: directionKeyCode, force: true })
        .trigger('keydown', { keyCode: KeyCodes.SPACE, force: true });
    });
  };
});
