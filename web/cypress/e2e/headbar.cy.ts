describe('Check headbar', () => {
  it('Check click location', () => {
    cy.visit('http://54.37.12.177:3000/')
    cy.get("a[href='/Products']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/Products')
    cy.get("a[href='/Service']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/Service')
    cy.get("a[href='/Store']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/Store')
    cy.get("a[href='/Partnership']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/Partnership')
    cy.get("a[href='/Login']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/Login')
    cy.get("a[href='/']").click()
    cy.location('href').should('eq', 'http://54.37.12.177:3000/')
  })
})