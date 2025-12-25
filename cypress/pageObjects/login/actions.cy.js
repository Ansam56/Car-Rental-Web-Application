class loginActions {
  typeInEmail(email) {
    cy.get('input[type="email"]').clear().type(email);
    return this;
  }

  typeInPassword(password) {
    cy.get('input[type="password"]').clear().type(password);
    return this;
  }

  clickOnLoginButton() {
    cy.get('button[type="submit"]').click();
    return this;
  }
}
export default loginActions;
