// ActorCard.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ActorCard from "./ActorCard";

describe("ActorCard component", () => {
  const actor = {
    name: "Luke Skywalker",
    height: "172",
    birth_year: "19BBY",
  };

  it("renders actor details correctly", () => {
    const portalElement = document.createElement("div");
    portalElement.setAttribute("id", "modal-root");
    document.body.appendChild(portalElement);
    render(<ActorCard actor={actor} />);
    expect(screen.getByText(actor.name)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${actor.height}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Birth Year: ${actor.birth_year}`)
    ).toBeInTheDocument();
  });

  it("calls onDetailClick when Detail button is clicked", () => {
    const onDetailClick = jest.fn();
    render(<ActorCard actor={actor} onDetailClick={onDetailClick} />);
    const detailButton = screen.getByText("Detail");
    fireEvent.click(detailButton);
    expect(onDetailClick).toHaveBeenCalledWith(actor);
  });
});
