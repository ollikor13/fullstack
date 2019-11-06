/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Name1',
      username: 'Username1',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front login page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })
  it('user can login', function () {
    cy.get('input:first')
      .type('Username1')
    cy.get('input:last')
      .type('password')
    cy.contains('Login')
      .click()
    cy.contains('Signed in as: Name1')
  })
  it('a new blog can be created', function() {
    cy.get('input:first')
      .type('Username1')
    cy.get('input:last')
      .type('password')
    cy.contains('Login')
      .click()
    cy.contains('Add a new blog')
      .click()
    cy.get('#title')
      .type('Cypress test title')
    cy.get('#author')
      .type('Name1')
    cy.get('#url')
      .type('Cypress test url')
    cy.contains('Submit')
      .click()
    cy.contains('Cypress test title')
  })
})