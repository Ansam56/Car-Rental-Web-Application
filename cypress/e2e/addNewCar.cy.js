/// <reference types="cypress" />

describe("Check add new car Functionality", () => {
  beforeEach("", () => {
    cy.loginToCarRentals("admin@admin.com", "admin123");
  });

  it("Validate that the admin can add new car with valid data", () => {});
});
