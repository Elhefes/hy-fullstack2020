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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testUser')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-note').click()

      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testurl.com')
      cy.get('#create').click()
      cy.contains('testTitle testAuthor')
    })
  })
})