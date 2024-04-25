// ActorDetail.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom"; // Import ReactDOM

import ActorDetail from "./ActorDetail"; // Adjust the import path as needed

describe("ActorDetail component", () => {
  const actor = {
    name: "Luke Skywalker",
    height: "172",
    birth_year: "19BBY",
  };

  // Create a mock portal container and append it to the document body
  let portalContainer;

  beforeEach(() => {
    portalContainer = document.createElement("div");
    portalContainer.id = "modal-root"; // Make sure this matches your actual portal container ID
    document.body.appendChild(portalContainer);
  });

  afterEach(() => {
    // Clean up: Remove the portal container from the document body
    document.body.removeChild(portalContainer);
  });

  it("renders actor details correctly", () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <ActorDetail actor={actor} closeModal={closeModal} />,
      { container: portalContainer } // Specify the portal container
    );
    expect(getByText(actor.name)).toBeInTheDocument();
    expect(getByText(`Height: ${actor.height}`)).toBeInTheDocument();
    expect(getByText(`Birth Year: ${actor.birth_year}`)).toBeInTheDocument();
  });

  it("calls closeModal when backdrop is clicked", () => {
    const closeModal = jest.fn();
    const { getByTestId } = render(
      <ActorDetail actor={actor} closeModal={closeModal} />,
      { container: portalContainer } // Specify the portal container
    );
    const backdrop = getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal when close button is clicked", () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <ActorDetail actor={actor} closeModal={closeModal} />,
      { container: portalContainer } // Specify the portal container
    );
    const closeButton = getByText("×");
    fireEvent.click(closeButton);
    expect(closeModal).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
