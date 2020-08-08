import { func } from "prop-types"

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testUser',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testUser')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testUser')
      cy.get('#password').type('testUser')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'testPassword' })
    })

    it('A blog can be created', function () {
      cy.get('#new-note').click()

      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testurl.com')
      cy.get('#create').click()
      cy.contains('a new blog testTitle by testAuthor')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress Test Blog',
          author: 'Cypress Test Author',
          url: 'Cypress Test Url',
          likes: '0',
        })
      })

      it('the blog can be liked', function () {
        cy.get('#toggle-visibility').click()
        cy.contains('Cypress Test Blog').get('#like').click()
        cy.contains('likes 1')
      })

      it('the blog can be removed', function () {
        cy.get('#toggle-visibility').click()
        cy.get('#delete').click()
        cy.get('html').should('not.contain', 'Cypress Test Blog')
      })
    })
  })
})