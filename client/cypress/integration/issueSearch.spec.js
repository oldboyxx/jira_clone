import { testid } from '../support/utils';

describe('Issue search', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.createTestAccount();
    cy.visit('/project/board?modal-issue-search=true');
  });

  it('displays recent issues if search input is empty', () => {
    getIssueSearchModal().within(() => {
      cy.contains('Recent Issues').should('exist');
      getIssues().should('have.length', 3);

      cy.get('input').debounced('type', 'anything');
      cy.contains('Recent Issues').should('not.exist');

      cy.get('input').debounced('clear');
      cy.contains('Recent Issues').should('exist');
      getIssues().should('have.length', 3);
    });
  });

  it('displays matching issues successfully', () => {
    getIssueSearchModal().within(() => {
      cy.get('input').debounced('type', 'Issue');
      getIssues().should('have.length', 3);

      cy.get('input').debounced('type', ' description');
      getIssues().should('have.length', 2);

      cy.get('input').debounced('type', ' 3');
      getIssues().should('have.length', 1);

      cy.contains('Matching Issues').should('exist');
    });
  });

  it('displays message if no results were found', () => {
    getIssueSearchModal().within(() => {
      cy.get('input').debounced('type', 'gibberish');

      getIssues().should('not.exist');
      cy.contains("We couldn't find anything matching your search").should('exist');
    });
  });

  const getIssueSearchModal = () => cy.get(testid`modal:issue-search`);
  const getIssues = () => cy.get('a[href*="/project/board/issues/"]');
});
