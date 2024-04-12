
describe('Check /Products', () => {
    it('Check Products categories', () => {
        cy.visit('http://54.37.12.177:3000/Products')

        //check if there are more than one category on the page
        cy.get('div.categories').should('have.length.gt', 1)
    })
    it('Hover a products', () => {
        cy.visit('http://54.37.12.177:3000/Products')

        //check if there are more than one category on the page
        cy.get('div.categories').should('have.length.gt', 1)
        //cy.get('div.article').first().trigger('mouseover')
        cy.wait(1000)
        cy.get('div.article').first().realHover('mouse').wait(300)
            .should('have.css', 'opacity', '0.8').and('have.css', 'scale', '1.06')


    })
})