import faker from 'faker'

import { graphql_api } from '../../utils/graphql-request.service'

const titleAlreadyExists = title => `{
  titleExists(title: "${title}")
}`

const title = faker.lorem.words(4)
const content = faker.lorem.paragraphs(2)

describe('Cadastrar rascunho', () => {
  before(() => {
    cy.login()
    cy.get('#publications').click()
    cy.wait(3000)
  })
  
  it('Novo rascunho', () => {
    cy.get('#new-draft').click()
    cy.location("pathname").should("eq", "/admin/newDraft")
    
    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#save-draft').click()
    
    cy.get('#text-alert').should('contain', 'Rascunho adicionado com sucesso!')
    cy.wait(3000)

    cy.get('#new-draft').click()

    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#save-draft').click()
    
    cy.get('#text-alert').should('contain', 'Já existe um rascunho com este título, tente outro.')
    cy.wait(3000)
  })

  it('Validar rascunho', async () => {
    const { titleExists } = await graphql_api(titleAlreadyExists(title))
    expect(titleExists).to.be.true
  })
})
