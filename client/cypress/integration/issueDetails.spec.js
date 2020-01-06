import { testid } from '../support/utils';

describe('Issue details', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.createTestAccount();
    cy.visit('/project/board');
    getListIssue().click(); // open issue details modal
  });

  it('updates type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.selectOption('type', 'Story');
      cy.selectOption('status', 'Done');
      cy.selectOption('assignees', 'Gaben', 'Yoda');
      cy.selectOption('reporter', 'Yoda');
      cy.selectOption('priority', 'Medium');
    });

    cy.assertReloadAssert(() => {
      getIssueDetailsModal().within(() => {
        cy.selectShouldContain('type', 'Story');
        cy.selectShouldContain('status', 'Done');
        cy.selectShouldContain('assignees', 'Gaben', 'Yoda');
        cy.selectShouldContain('reporter', 'Yoda');
        cy.selectShouldContain('priority', 'Medium');
      });

      getListIssue()
        .should('have.descendants', testid`avatar:Gaben`)
        .and('have.descendants', testid`avatar:Yoda`)
        .and('have.descendants', testid`icon:story`);
    });
  });

  it('updates title, description successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type('TEST_TITLE')
        .blur();

      cy.contains('Add a description...')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');
    });

    cy.assertReloadAssert(() => {
      getIssueDetailsModal().within(() => {
        cy.get('textarea[placeholder="Short summary"]').should('have.value', 'TEST_TITLE');
        cy.get('.ql-editor').should('contain', 'TEST_DESCRIPTION');
      });

      cy.get(testid`list-issue`).should('contain', 'TEST_TITLE');
    });
  });

  it('updates estimate, time tracking successfully', () => {
    getIssueDetailsModal().within(() => {
      getNumberInputAtIndex(0).debounced('type', '10');
      cy.contains('10h estimated').click(); // open tracking modal
    });

    cy.get(testid`modal:tracking`).within(() => {
      cy.contains('No time logged').should('exist');

      getNumberInputAtIndex(0).debounced('type', 1);
      cy.get('div[width="10"]').should('exist'); // tracking bar

      getNumberInputAtIndex(1).debounced('type', 2);

      cy.contains('button', 'Done')
        .click()
        .should('not.exist');
    });

    cy.assertReloadAssert(() => {
      getIssueDetailsModal().within(() => {
        getNumberInputAtIndex(0).should('have.value', '10');
        cy.contains('1h logged').should('exist');
        cy.contains('2h remaining').should('exist');
        cy.get('div[width*="33.3333"]').should('exist');
      });
    });
  });

  it('deletes an issue successfully', () => {
    getIssueDetailsModal()
      .find(`button ${testid`icon:trash`}`)
      .click();

    cy.get(testid`modal:confirm`)
      .contains('button', 'Delete issue')
      .click();

    cy.assertReloadAssert(() => {
      getIssueDetailsModal().should('not.exist');
      getListIssue().should('not.exist');
    });
  });

  it('creates a comment successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.contains('Add a comment...')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Add a comment..."]').type('TEST_COMMENT');

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.contains('Add a comment...').should('exist');
      cy.get(testid`issue-comment`).should('contain', 'TEST_COMMENT');
    });
  });

  it('edits a comment successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get(testid`issue-comment`)
        .contains('Edit')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Add a comment..."]')
        .should('have.value', 'Comment body')
        .clear()
        .type('TEST_COMMENT_EDITED');

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get(testid`issue-comment`)
        .should('contain', 'Edit')
        .and('contain', 'TEST_COMMENT_EDITED');
    });
  });

  it('deletes a comment successfully', () => {
    getIssueDetailsModal()
      .find(testid`issue-comment`)
      .contains('Delete')
      .click();

    cy.get(testid`modal:confirm`)
      .contains('button', 'Delete comment')
      .click()
      .should('not.exist');

    getIssueDetailsModal()
      .find(testid`issue-comment`)
      .should('not.exist');
  });

  const getIssueDetailsModal = () => cy.get(testid`modal:issue-details`);
  const getListIssue = () => cy.contains(testid`list-issue`, 'Issue title 1');
  const getNumberInputAtIndex = index => cy.get('input[placeholder="Number"]').eq(index);
});
