import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReactDOM from "react-dom";

import ActorDetail from "./ActorDetail";

describe("ActorDetail component", () => {
  const actor = {
    name: "Luke Skywalker",
    height: "172",
    birth_year: "19BBY",
  };
  let portalContainer;

  beforeEach(() => {
    portalContainer = document.createElement("div");
    portalContainer.id = "modal-root";
    document.body.appendChild(portalContainer);
  });

  afterEach(() => {
    document.body.removeChild(portalContainer);
  });

  it("renders actor details correctly", () => {
    const closeModal = jest.fn();
    render(
      <ActorDetail actor={actor} closeModal={closeModal} />,
      { container: portalContainer }
    );
    expect(screen.getByText(actor.name)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${actor.height}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Birth Year: ${actor.birth_year}`)
    ).toBeInTheDocument();
  });

  it("calls closeModal when backdrop is clicked", () => {
    const closeModal = jest.fn();
    render(<ActorDetail actor={actor} closeModal={closeModal} />, {
      container: portalContainer,
    });
    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal when close button is clicked", () => {
    const closeModal = jest.fn();
    render(<ActorDetail actor={actor} closeModal={closeModal} />, {
      container: portalContainer,
    });
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);
    expect(closeModal).toHaveBeenCalled();
  });

});
