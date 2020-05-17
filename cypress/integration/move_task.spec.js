describe('move task', () => {

    before(() => {
        cy.visit('http://localhost:3000');
        cy
            .get('#open-create-task-modal-button')
            .click();
        cy
            .get('#modal-title')
            .type('Title');

        cy
            .get('#save-create-task-modal-button')
            .click();
    });

    it(' moving task backwars when in 1st column does not change the tasks state', () => {

        // one task in the first column
        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 1);

        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .get('#move-task-backward')
            .click();

        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 1);
    });

    it(' moving task', () => {

        // one task in first column
        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 1);

        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .get('#move-task-forward')
            .click();

        // zero task in the first column
        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 0);

        // one task in the second column
        cy
            .get('#dashboard')
            .children()
            .first()
            .next()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 1);

        cy
            .get('#dashboard')
            .children()
            .first()
            .next()
            .children()
            .first()
            .next()
            .get('#move-task-backward')
            .click();

        // zero task in the second column
        cy
            .get('#dashboard')
            .children()
            .first()
            .next()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 0);

        // one task in the first column
        cy
            .get('#dashboard')
            .children()
            .first()
            .children()
            .first()
            .next()
            .children()
            .should('have.length', 1);
    });

})