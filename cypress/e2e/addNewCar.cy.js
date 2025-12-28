/// <reference types="cypress" />
import carFeaturesActions from "../pageObjects/carFeatures/actions.cy";
import carFeaturesAsserions from "../pageObjects/carFeatures/assertions.cy";

const carFeaturesAction = new carFeaturesActions();
const carFeaturesAssertion = new carFeaturesAsserions();

describe("Check add new car Functionality", () => {
  before("", () => {
    cy.loginToCarRentals("admin@admin.com", "admin123");
    cy.wait(1000);
  });

  it("Validate that the admin can add new car with valid data", () => {
    const carImages = [
      "https://di-uploads-pod35.dealerinspire.com/newtonnissanofgallatin/uploads/2023/04/2023-Nissan-Sentra-SR-Midnight-Edition-Model-Left.jpg",
      "https://hips.hearstapps.com/hmg-prod/images/2023-nissan-sentra-101-63ff9c909b419.jpg?crop=0.793xw:0.584xh;0.0977xw,0.281xh&resize=2048:*",
      "https://di-uploads-pod9.dealerinspire.com/illininissan/uploads/2023/09/2023-Nissan-Sentra-Midnight-Edition-silver.jpg",
    ];
    const description =
      "Experience the perfect blend of style and practicality with the Nissan Sentra. This sedan features a spacious interior with premium materials, a user-friendly infotainment system, and Nissan’s Safety Shield 360. Whether you're commuting to work or exploring the city, the Sentra ensures a comfortable and connected journey every time.";
    const shortDesc = description.slice(0, 60);
    carFeaturesAction
      .clickOnAddNewCarButton()
      .typeInCarName("Nissan Sentra")
      .typeInPricePerDay("70")
      .typeInImageURL(carImages)
      .typeInDescription(description)
      .clickOnSaveButton();
    cy.wait(5000);
    carFeaturesAssertion.checkCarCardInHomePage(
      "Nissan Sentra",
      "70",
      carImages[0],
      shortDesc
    );
    carFeaturesAction.clickOnCarCard("Nissan Sentra");
    carFeaturesAssertion.checkCarInfoInCarDetailsPage(
      "Nissan Sentra",
      carImages,
      description
    );
  });

  after("", () => {
    cy.logout();
  });
});
