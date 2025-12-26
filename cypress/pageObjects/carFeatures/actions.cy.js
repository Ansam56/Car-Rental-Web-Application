class CarActions {
  clickOnAddNewCarButton() {
    cy.contains("button", "Add New Car").click();
    return this;
  }
  typeInCarName(name) {
    cy.get(".form-control").eq(0).clear().type(name);
    return this;
  }

  typeInPricePerDay(price) {
    cy.get(".form-control").eq(1).clear().type(price);
    return this;
  }

  typeInImageURL(carImages) {
    carImages.forEach((image, idx) => {
      cy.get(".form-control")
        .eq(idx + 2)
        .clear()
        .type(image);
      this.clickOnAddImageButton();
    });
    return this;
  }

  clickOnAddImageButton() {
    cy.contains("button", "Add Image").click();
    return this;
  }

  typeInDescription(description) {
    cy.get("textarea").clear().type(description);
    return this;
  }

  clickOnSaveButton() {
    cy.contains("button", "Save").click();
    return this;
  }

  clickOnCarCard(carName) {
    cy.contains("a", carName).click();
    return this;
  }

  clickOnEditButton() {
    cy.contains("button", "Edit Car").click();
    return this;
  }

  clickOnDeleteButton() {
    cy.contains("button", "Delete").click();
    return this;
  }
  clickOnConfirmDeleteButton() {
    cy.contains("button", "Confirm Delete").click();
    return this;
  }
}
export default CarActions;
