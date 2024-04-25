// ActorList.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ActorList from "./ActorsList";

describe("ActorList component", () => {
  const actors = [
    { fields: { name: "Luke Skywalker", height: "172", birth_year: "19BBY" } },
    { fields: { name: "Darth Vader", height: "202", birth_year: "41.9BBY" } },
  ];

  it("renders actor cards correctly", () => {
    const { getByText } = render(<ActorList actors={actors} />);
    actors.forEach((actor) => {
      expect(getByText(actor.fields.name)).toBeInTheDocument();
      expect(getByText(`Height: ${actor.fields.height}`)).toBeInTheDocument();
      expect(
        getByText(`Birth Year: ${actor.fields.birth_year}`)
      ).toBeInTheDocument();
    });
  });

  it("calls onDetailClick when Detail button is clicked", () => {
    const onDetailClick = jest.fn();
    const { getByText } = render(
      <ActorList actors={actors} onDetailClick={onDetailClick} />
    );
    const detailButtons = document.querySelectorAll("button");
    detailButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(onDetailClick).toHaveBeenCalledWith(actors[index].fields);
    });
  });
});
