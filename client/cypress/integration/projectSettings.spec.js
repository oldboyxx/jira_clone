import { testid } from '../support/utils';

describe('Project settings', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.createTestAccount();
    cy.visit('/project/settings');
  });

  it('should display current values in form', () => {
    cy.get('input[name="name"]').should('have.value', 'Project name');
    cy.get('input[name="url"]').should('have.value', 'https://www.testurl.com');
    cy.get('.ql-editor').should('contain', 'Project description');
    cy.selectShouldContain('category', 'Software');
  });

  it('validates form and updates project successfully', () => {
    cy.get('input[name="name"]').clear();
    cy.get('button[type="submit"]').click();
    cy.get(testid`form-field:name`).should('contain', 'This field is required');

    cy.get('input[name="name"]').type('TEST_NAME');
    cy.get(testid`form-field:name`).should('not.contain', 'This field is required');

    cy.selectOption('category', 'Business');
    cy.get('button[type="submit"]').click();
    cy.contains('Changes have been saved successfully.').should('exist');

    cy.reload();

    cy.get('input[name="name"]').should('have.value', 'TEST_NAME');
    cy.selectShouldContain('category', 'Business');
  });
});
