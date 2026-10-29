describe('Login com sucesso', () => {

  it('Deve fazer login com um usuário válido', () => {
    cy.visit('http://localhost:3000/')
    cy.readFile('data/database.json').then((database) => {

      const users = database.users
      const randomUser = users[Math.floor(Math.random() * users.length)]

    cy.get('[name="username"]').type(randomUser.username)
    cy.get('[name="password"]').type('s3cret')
    cy.get('[data-test="signin-submit"]').click()
    })
  })
})



describe('Tentar fazer login com credenciais inválidas', () => {

  it('Deve exibir uma mensagem de erro ao fazer login com credenciais inválidas', () => {
    cy.visit('http://localhost:3000/')
      cy.get('[name="username"]').type('test')
      cy.get('[name="password"]').type('secr3t')
      cy.get('[data-test="signin-submit"]').click()

    cy.contains('Username or password is invalid').should('be.visible')
  })
})



describe('Registro de novo usuário com sucesso', () => {

  it('Deve registrar um novo usuário com informações válidas', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test="signup"]').click()

      cy.get('[name="firstName"]').type('Celine')
      cy.get('[name="lastName"]').type('Host')
      cy.get('[name="username"]').type('Celine_Host')
      cy.get('[name="password"]').type('s3cret')
      cy.get('[name="confirmPassword"]').type('s3cret')

    cy.get('[data-test="signup-submit"]').click()
  })
})



describe('Tentar registrar um novo usuário com informações incompletas', () => {
  it('Deve exibir mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test="signup"]').click()

      cy.get('[name="firstName"]').type('Gordon')
      cy.get('[name="lastName"]').type('Ive')
      cy.get('[name="password"]').type('s3cret')
      cy.get('[name="confirmPassword"]').type('s3cret')

      cy.get('[data-test="signup-submit"]').should('be.disabled')
  });
});