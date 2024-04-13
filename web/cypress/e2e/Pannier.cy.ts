
describe('Check Pannier', () => {
    it('Pannier change value, to be sure they are save in DB', () => {

        // vidéo => https://www.youtube.com/watch?v=IrWZvaFraTQ
        const valueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
        ).set
        let InitialValue

        cy.visit('http://54.37.12.177:3000/app')


        cy.get('input[name="Num"]')
            .invoke('val')

            .then(sometext => {
                InitialValue = sometext; //get initial value
                cy.log(InitialValue);

            })

            .wait(1000).then( () => {
                cy.get('input[name="Num"]').first()
                    .should('have.value', InitialValue)
                    .then(function ($slider) {
                        valueSetter.call($slider[0], 42); //set new 42 value
                    })
                    .trigger('change')


                })
            .wait(1000).then( ()=> {
                cy.visit('http://54.37.12.177:3000/app') //reload page to be sure it save in DB
                    .wait(1000).then(() => {
                        cy.get('input[name="Num"]').first()
                            .should('have.value', 42)//check if 42 value is saved in DB
                            .then(function ($slider) {
                                valueSetter.call($slider[0], InitialValue); //set initial value
                            })
                            .trigger('change')

                        })
                    .wait(1000).then( () => {
                        cy.visit('http://54.37.12.177:3000/app').wait(1000).then( () => { //reload page to be sure it save in DB
                            cy.get('input[name="Num"]').first()
                                .should('have.value', InitialValue) // check the inital vaulue is back in DB
                        })
                    })
                }
            )
    })
})