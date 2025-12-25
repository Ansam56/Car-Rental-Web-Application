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

  typeInImageURL(image) {
    let idx = 2;
    cy.get(".form-control").eq(idx).clear().type(image);
    idx++;
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
}
export default CarActions;
