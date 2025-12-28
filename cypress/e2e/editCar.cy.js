/// <reference types="cypress" />
import carFeaturesActions from "../pageObjects/carFeatures/actions.cy";
import carFeaturesAsserions from "../pageObjects/carFeatures/assertions.cy";

const carFeaturesAction = new carFeaturesActions();
const carFeaturesAssertion = new carFeaturesAsserions();

describe("Check edit car Functionality", () => {
  before("", () => {
    cy.loginToCarRentals("admin@admin.com", "admin123");
    cy.wait(1000);
  });

  it("Validate that the admin can edit car Info", () => {
    const carImages = [
      "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/sentra/2023/Features/Performance/2023-nissan-sentra-front-view-white-driving-through-city-streets.jpeg.ximg.l_6_m.smart.jpeg",
      "https://i.ytimg.com/vi/rvx1QI-Q5qQ/maxresdefault.jpg",
    ];

    const description =
      "The Nissan Sentra redefines what a compact sedan can be. With its striking modern exterior and a thoughtfully designed cabin, it offers a premium experience at every turn. Stay connected with seamless smartphone integration and enjoy peace of mind with standard advanced driver-assist features. Efficient, stylish, and packed with technology, the Sentra is built for those who refuse to compromise on.";
    const shortDesc = description.slice(0, 60);

    carFeaturesAction
      .clickOnCarCard("Nissan Sentra")
      .clickOnEditButton()
      .typeInPricePerDay("75")
      .typeInImageURL(carImages)
      .typeInDescription(description)
      .clickOnSaveButton();
    cy.wait(5000);
    carFeaturesAssertion.checkCarInfoInCarDetailsPage(
      "Nissan Sentra",
      carImages,
      description
    );
    cy.go("back");
    carFeaturesAssertion.checkCarCardInHomePage(
      "Nissan Sentra",
      "75",
      carImages[0],
      shortDesc
    );
  });

  after("", () => {
    cy.logout();
  });
});
