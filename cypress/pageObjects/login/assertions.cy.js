class loginAssertions {
  checkIfMenuContainsDashboard() {
    cy.get("h1").should("be.visible").and("have.text", "Cars List");
    return this;
  }

  checkIfLoginErrorIsAppear() {
    cy.get("div").should("contain.text", "Invalid email or password");
    return this;
  }
}

export default loginAssertions;
