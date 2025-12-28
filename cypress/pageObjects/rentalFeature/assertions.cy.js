class RentalAssertions {
  checkTotalRentalPrice(expectedPrice) {
    cy.get(".text-center").eq(0).should("include.text", expectedPrice);
    return this;
  }

  checkBookingConfirmationMessage() {
    cy.get("p").should(
      "contain.text",
      `Your car has been reserved successfully.`
    );
    cy.contains("button", "View My Bookings").click();

    return this;
  }

  checkRentalCarInHistory(fromDate, toDate, totalPrice) {
    cy.contains("td", fromDate).should("be.visible");
    cy.contains("td", toDate).should("be.visible");
    cy.contains("td", totalPrice).should("be.visible");
    return this;
  }
}
export default RentalAssertions;
