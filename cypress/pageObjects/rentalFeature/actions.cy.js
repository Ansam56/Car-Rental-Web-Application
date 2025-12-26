class RentalActions {
  clickOnCarCard(carName) {
    cy.contains("a", carName).click();
    return this;
  }

  clickOnRentNowButton() {
    cy.contains("button", "Rent Now").click();
    return this;
  }

  typeInRentDetails(from, to) {
    cy.get('input[type="date"]').first().type(from);
    cy.get('input[type="date"]').last().type(to);
    return this;
  }

  clickOnRentButton() {
    cy.contains(".btn-dark", "Rent").click();
    return this;
  }
}
export default RentalActions;
