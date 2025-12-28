/// <reference types="cypress" />
import rentalFeaturesActions from "../pageObjects/rentalFeature/actions.cy";
import rentalFeaturesAsserions from "../pageObjects/rentalFeature/assertions.cy";

const rentalFeaturesAction = new rentalFeaturesActions();
const rentalFeaturesAssertion = new rentalFeaturesAsserions();

describe("Check rental car Functionality", () => {
  before("", () => {
    cy.loginToCarRentals("normal@normal.com", "normal123");
    cy.wait(1000);
  });

  it("Validate that the normal user can rent new car", () => {
    rentalFeaturesAction
      .clickOnCarCard("Nissan Sentra")
      .clickOnRentNowButton()
      .typeInRentDetails("2026-01-08", "2026-01-10");
    rentalFeaturesAssertion.checkTotalRentalPrice("$210");
    rentalFeaturesAction.clickOnRentButton();
    rentalFeaturesAssertion
      .checkBookingConfirmationMessage()
      .checkRentalCarInHistory("1/8/2026", "1/10/2026", "$210");
  });

  after("", () => {
    cy.logout();
  });
});
