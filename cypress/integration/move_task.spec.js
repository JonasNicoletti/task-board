/* eslint-disable no-undef */
describe('move task', () => {
  before(() => {
    cy.visit('/')
    cy
      .get('#open-create-task-modal-button')
      .click()
    cy
      .get('#task-input-title')
      .type('Title')

    cy
      .get('#save-create-task-modal-button')
      .click()
  })

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
      .should('have.length', 1)

    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .get('#move-task-backward')
      .click()

    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .children()
      .should('have.length', 1)
  })

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
      .should('have.length', 1)

    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .get('#move-task-forward')
      .click()

    // zero task in the first column
    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .children()
      .should('have.length', 0)

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
      .should('have.length', 1)

    cy
      .get('#dashboard')
      .children()
      .first()
      .next()
      .children()
      .first()
      .next()
      .get('#move-task-backward')
      .click()

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
      .should('have.length', 0)

    // one task in the first column
    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .children()
      .should('have.length', 1)
  })

  it('move task using drag and drop', () => {
    const dataTransfer = new DndSimulatorDataTransfer()

    cy
      .get('#dashboard')
      .children()
      .first()
      .children()
      .first()
      .next()
      .children()
      .first()
      .trigger('mousedown', { which: 1 })
      .trigger('dragstart', { dataTransfer })
      .trigger('drag', {});

    cy
      .get('#dashboard')
      .children()
      .first()
      .next()
      .next()
      .children()
      .first()
      .next()
      .trigger('dragover', { dataTransfer })
      .trigger('drop', { dataTransfer })
      .trigger('dragend', { dataTransfer })
      .trigger('mouseup', { which: 1 })





    function DndSimulatorDataTransfer() {
      this.data = {}
    }

    DndSimulatorDataTransfer.prototype.dropEffect = "move"
    DndSimulatorDataTransfer.prototype.effectAllowed = "all"
    DndSimulatorDataTransfer.prototype.files = []
    DndSimulatorDataTransfer.prototype.items = []
    DndSimulatorDataTransfer.prototype.types = []

    DndSimulatorDataTransfer.prototype.clearData = function (format) {
      if (format) {
        delete this.data[format]

        const index = this.types.indexOf(format)
        delete this.types[index]
        delete this.data[index]
      } else {
        this.data = {}
      }
    }

    DndSimulatorDataTransfer.prototype.setData = function (format, data) {
      this.data[format] = data
      this.items.push(data)
      this.types.push(format)
    }

    DndSimulatorDataTransfer.prototype.getData = function (format) {
      if (format in this.data) {
        return this.data[format]
      }

      return ""
    }
  })
})
