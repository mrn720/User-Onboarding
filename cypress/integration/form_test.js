describe('General Form Tests', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:9005')
    })

    it('Does Name input work?', () => {
        const textIn = () => cy.get('[name="name"]')
        textIn().should('exist')
        textIn().type("Oh am I working? Please say yes!").should('have.value', "Oh am I working? Please say yes!")
    })

    it('Do the other inputs work? Also testing Submit button', () => {
        const textInput = "Hi Im bob"
        cy.get('[name="email"]').type("bob@bob.com").should('have.value', "bob@bob.com")
        cy.get('[name="password"]').type(textInput).should('have.value',textInput)
        cy.get('[name="name"]').type(textInput)
        cy.get('[name="submitButton"]').click()
    })

    it('Does Terms box work?', () => {
        cy.get('[name="terms"]').check()
    })

    it('Initial Submit', () => {
        cy.get('[name="submitButton"]').should('be.disabled')
    })
})