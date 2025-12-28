/// <reference types="cypress" />
import carFeaturesActions from "../pageObjects/carFeatures/actions.cy";
import carFeaturesAsserions from "../pageObjects/carFeatures/assertions.cy";

const carFeaturesAction = new carFeaturesActions();
const carFeaturesAssertion = new carFeaturesAsserions();

describe("Check delete car Functionality", () => {
  before("", () => {
    cy.loginToCarRentals("admin@admin.com", "admin123");
    cy.wait(1000);
  });

  it("Validate that the admin can delete car", () => {
    carFeaturesAction
      .clickOnCarCard("Nissan Sentra")
      .clickOnDeleteButton()
      .clickOnConfirmDeleteButton();

    carFeaturesAssertion.checkCarIsDeleted("Nissan Sentra");
  });

  after("", () => {
    cy.logout();
  });
});
