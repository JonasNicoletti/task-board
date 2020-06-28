/* eslint-disable no-undef */

describe("create a new task", () => {
  beforeEach(function () {
    // Fetch fixtures.
    cy.fixture("initStates").as("statesQuery");
    cy.fixture("getTasks").as("tasksQuery");
    cy.fixture("createTask").as("taskMutation");
  });

  beforeEach(function () {
    // Fetch fixtures.
    cy.mockGraphQL([this.statesQuery, this.tasksQuery, this.taskMutation]);
    cy.visit('/');
  });

  it("open modal when click on open", () => {
    cy.get("#create-task-modal").should("not.be.visible");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#create-task-modal").should("be.visible");
  });

  it("close modal when click on close button", () => {
    cy.get("#open-create-task-modal-button").click();

    cy.get("#create-task-modal").should("be.visible");

    cy.get("#close-create-task-modal-button").click();

    cy.get("#create-task-modal").should("not.be.visible");
  });

  it("validate input when click on save button", () => {
    cy.get("#open-create-task-modal-button").click();

    cy.get("#create-task-modal").should("be.visible");

    cy.get("#save-create-task-modal-button").click();

    cy.get("#create-task-modal").should("be.visible");
  });

  it.only("create task when click on save button", () => {
    const typedText = "Task Title";

    cy.get("#task-input-title").should("not.be.visible");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#create-task-modal").should("be.visible");

    cy.get("#task-input-title").type(typedText).should("have.value", typedText);

    cy.get("#save-create-task-modal-button").click();

    cy.get("#create-task-modal").should("not.be.visible");

    cy.get("[data-cy=task-title]").contains(typedText);
  });

  it("create task with category", () => {
    const typedText = "Task Title";
    const typedCat = "Category";

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedText).should("have.value", typedText);

    cy.get("#modal-category").type(typedCat);

    // only 1 only if there are no caterories yet
    cy.get(".MuiAutocomplete-listbox").children().should("have.length", 1);

    cy.get(".MuiChip-label").contains(typedCat);

    cy.get(".MuiChip-label").click();

    // autocomplete added the typed value into the input field
    cy.get("#modal-category").should("have.value", typedCat);

    cy.get("#save-create-task-modal-button").click();

    // after saving the category is showing
    cy.get(".task-category").contains(typedCat);
  });

  it("create task with existing category", () => {
    const typedText = "Task Title";
    const typedCat = "Category";

    // START create task with category
    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedText);

    cy.get("#modal-category").type(typedCat);

    cy.get(".MuiChip-label").click();

    cy.get("#save-create-task-modal-button").click();

    // END create task with category

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedText);

    cy.get("#modal-category").click();

    // autocomplete shows the existing category
    cy.get(".MuiAutocomplete-listbox").children().first().contains(typedCat);

    // select the existing category and save
    cy.get(".MuiAutocomplete-listbox").children().first().click();

    cy.get("#save-create-task-modal-button").click();

    // START control that no new task was added
    cy.get("#open-create-task-modal-button").click();

    cy.get("#modal-category").click();

    cy.get(".MuiAutocomplete-listbox").children().should("have.length", 1);
    // END control that no new task was added
  });

  it("new categories have different colors", () => {
    const typedText = "Task Title";
    const typedCat1 = "Category 1";
    const typedCat2 = "Category 2";

    // START create task with category 1
    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedText);

    cy.get("#modal-category").type(typedCat1);

    cy.get(".MuiChip-label")
      .contains('Add "' + typedCat1 + '"')
      .click();

    cy.get("#save-create-task-modal-button").click();
    // END create task with category 1

    // START create task with category 2
    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedText);

    cy.get("#modal-category").type(typedCat2);

    cy.get(".MuiChip-label")
      .contains('Add "' + typedCat2 + '"')
      .click();

    cy.get("#save-create-task-modal-button").click();
    // END create task with category 2

    cy.get(".task-category")
      .first()
      .should("have.css", "background-color")
      .and("eq", "rgb(255, 51, 31)");

    cy.get(".task-category")
      .eq(1)
      .should("have.css", "background-color")
      .and("eq", "rgb(54, 38, 167)");
  });

  it("create task with description", () => {
    const typedTitle = "Task Title";
    const typedDescription = "Task Description";

    // START create task with description
    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#task-input-description").type(typedDescription);

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-description").contains(typedDescription);
  });
});
