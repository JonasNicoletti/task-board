/* eslint-disable no-undef */
describe("edit task", () => {
  it("edit title", () => {
    const typedTitle = "updated title";

    cy.visit("/");
    cy.get("#open-create-task-modal-button").click();
    cy.get("#task-input-title").type("Title");

    cy.get("#save-create-task-modal-button").click();

    cy.get("[data-cy=edit]").click();

    cy.get("#task-input-title").clear().type(typedTitle);

    cy.get("#save-create-task-modal-button").click();

    cy.get("[data-cy=task-title]").contains(typedTitle);
  });

  it("remove category", () => {
    const typedTitle = "title";
    const typedCat = "cat";

    cy.visit("/");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#modal-category").type(typedCat);

    cy.get(".MuiChip-label").click();

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.visible");

    cy.get("[data-cy=edit]").click();

    cy.get("#modal-category").clear();

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.not.visible");
  });

  it("add category", () => {
    const typedTitle = "title";
    const typedCat = "cat";

    cy.visit("/");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.not.visible");

    cy.get("[data-cy=edit]").click();

    cy.get("#modal-category").type(typedCat);

    cy.get(".MuiChip-label").click();

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.visible").contains(typedCat);
  });

  it("change category", () => {
    const typedTitle = "title";
    const typedCat1 = "cat 1";
    const typedCat2 = "cat 2";

    cy.visit("/");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#modal-category").type(typedCat1);

    cy.get(".MuiChip-label").click();

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.visible");

    cy.get("[data-cy=edit]").click();

    cy.get("#modal-category").clear().type(typedCat2);

    cy.get(".MuiChip-label")
      .contains('Add "' + typedCat2 + '"')
      .click();

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-category").should("be.visible").contains(typedCat2);
  }); 
  
  it("edit description", () => {
    const typedTitle = "title";
    const typedDescription1= "desc 1";
    const typedDescription2 = "desc 2";

    cy.visit("/");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-description").should("be.not.visible");

    cy.get("[data-cy=edit]").click();

    cy.get("#task-input-description").type(typedDescription1);

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-description").should("be.visible").contains(typedDescription1);

    cy.get("[data-cy=edit]").click();

    cy.get("#task-input-description").clear().type(typedDescription2);

    cy.get("#save-create-task-modal-button").click();

    cy.get(".task-description").should("be.visible").contains(typedDescription2);
  }); 
  
  it("should not be able to save without title", () => {
    const typedTitle = "title";

    cy.visit("/");

    cy.get("#open-create-task-modal-button").click();

    cy.get("#task-input-title").type(typedTitle);

    cy.get("#save-create-task-modal-button").click();

    cy.get("[data-cy=edit]").click();

    cy.get("#task-input-title").clear();

    cy.get("#save-create-task-modal-button").click();

    cy.get("[data-cy=title-error-text]").should("be.visible");

  });
});
