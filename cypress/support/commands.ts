Cypress.Commands.add('getMain', () => cy.get('[data-cy=main]'));
Cypress.Commands.add('getBun', () => cy.get('[data-cy=bun]'));
Cypress.Commands.add('getModal', () => cy.get('#modals'));
Cypress.Commands.add('getCloseButton', () => cy.get('[data-cy="close-button"]'));

declare namespace Cypress {
    interface Chainable {
      getMain(): Chainable<JQuery<HTMLElement>>;
      getBun(): Chainable<JQuery<HTMLElement>>;
      getModal(): Chainable<JQuery<HTMLElement>>;
      getCloseButton(): Chainable<JQuery<HTMLElement>>;
    }
  }

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//