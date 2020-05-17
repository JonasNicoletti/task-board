describe('create a new task', () => {

    it('open modal when click on open', () => {
        cy.visit('http://localhost:3000');

        cy
            .get('#create-task-modal')
            .should('not.be.visible');

        cy
            .get('#open-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('be.visible');

    });

    it('close modal when click on close button', () => {
        cy.visit('http://localhost:3000');

        cy
            .get('#open-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('be.visible');

        cy
            .get('#close-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('not.be.visible');
    });

    it('validate input when click on save button', () => {
        cy.visit('http://localhost:3000');

        cy
            .get('#open-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('be.visible');

        cy
            .get('#save-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('be.visible');
    });

    it('create task when click on save button', () => {

        const typedText = 'Task Title';

        cy.visit('http://localhost:3000');

        cy
            .get('#task-title')
            .should('not.be.visible');

        cy
            .get('#open-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('be.visible');

        cy
            .get('#modal-title')
            .type(typedText)
            .should('have.value', typedText);

        cy
            .get('#save-create-task-modal-button')
            .click();

        cy
            .get('#create-task-modal')
            .should('not.be.visible');

        cy
            .get('#task-title')
            .contains(typedText);
    });
})