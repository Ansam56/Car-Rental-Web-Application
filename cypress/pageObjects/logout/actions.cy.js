export default class logoutActions {
  clickOnLogout() {
    cy.contains("button", "Logout").click();

    return this;
  }
}
