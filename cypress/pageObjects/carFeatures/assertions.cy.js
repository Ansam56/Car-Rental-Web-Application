class CarAssertions {
  checkCarCardInHomePage(carName, carPrice, carImage, carDescription) {
    cy.get("h3").should("contain.text", carName);
    cy.get("p").should("contain.text", `$${carPrice} / day`);
    cy.contains(carName)
      .closest("a")
      .find("img")
      .should("have.attr", "src", carImage);
    cy.contains(carName)
      .closest("a")
      .find("p")
      .should("include.text", carDescription);
    return this;
  }

  checkCarInfoInCarDetailsPage(carName, carImages, carDescription) {
    cy.get("h1").should("contain.text", carName);
    carImages.forEach((image, index) => {
      cy.get("img")
        .eq(index + 1)
        .should("have.attr", "src", image);
    });
    cy.get("p").should("contain.text", carDescription);
    return this;
  }

  checkCarIsDeleted(carName) {
    cy.contains(carName).should("not.exist");
    return this;
  }
}
export default CarAssertions;
