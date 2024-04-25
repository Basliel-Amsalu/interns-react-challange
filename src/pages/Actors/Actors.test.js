/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Actors from "./Actors";

describe("Actors component", () => {
  it("renders loading message initially", async () => {
    render(<Actors />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders actors list after loading", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                fields: {
                  name: "Luke Skywalker",
                  height: "172",
                  birth_year: "19BBY",
                  url: 1,
                },
              },
              {
                fields: {
                  name: "Darth Vader",
                  height: "202",
                  birth_year: "41.9BBY",
                  url: 2,
                },
              },
            ],
            next: "/api/people/?page=2",
            previous: "null",
            count: 2,
            pages: 2,
          }),
      })
    );
    render(<Actors />);
    await waitFor(() => {
      const actorList = screen.getByText(/Star Wars Characters/i);
      expect(actorList).toBeInTheDocument();
      const actor1 = screen.getByText(/Luke Skywalker/i);
      expect(actor1).toBeInTheDocument();
      const actor2 = screen.getByText(/Darth Vader/i);
      expect(actor2).toBeInTheDocument();
    });
  });

  //   only testing the previous button because the test cases are not enough for next page
  it("clicking on previous page button fetches previous page of actors", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                fields: {
                  name: "Luke Skywalker",
                  height: "172",
                  birth_year: "19BBY",
                  url: 1,
                },
              },
              {
                fields: {
                  name: "Darth Vader",
                  height: "202",
                  birth_year: "41.9BBY",
                  url: 2,
                },
              },
            ],
            next: "/api/people/?page=2",
            previous: "null",
            count: 2,
            pages: 2,
          }),
      })
    );
    render(<Actors />);
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Previous Page/i));
      expect(fetch).toHaveBeenCalled();
    });
  });
});
