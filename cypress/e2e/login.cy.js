/// <reference types="cypress" />

import loginAssertions from "../pageObjects/login/assertions.cy";

const loginassertions = new loginAssertions();
describe("Check Login Functionality", () => {
  beforeEach("", () => {
    cy.visit("/login");
  });

  it("Validate that the user can login using valid email & valid password", () => {
    cy.loginToCarRentals("admin@admin.com", "admin123");
    loginassertions.checkIfMenuContainsDashboard();
    cy.logout();
  });

  it("Vlaidate that the user can't login with invalid email and valid password", () => {
    cy.loginToCarRentals("user123@gmail.com", "admin123");
    loginassertions.checkIfLoginErrorIsAppear();
  });

  it("Validate that the user can't login with valid email and invalid password", () => {
    cy.loginToCarRentals("admin@admin.com", "admin");
    loginassertions.checkIfLoginErrorIsAppear();
  });

  it("Validate that the user can't login with invalid email and invalid password", () => {
    cy.loginToCarRentals("user123@gmail.com", "admin");
    loginassertions.checkIfLoginErrorIsAppear();
  });
});
