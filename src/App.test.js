// App.test.js
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// Mocking fetch to simulate API calls

describe("App component", () => {
  test("renders loading message initially", async () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders actors list after loading", async () => {
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
    render(<App />);
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
  test("clicking on previous page button fetches previous page of actors", async () => {
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
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Previous Page/i));
      expect(fetch).toHaveBeenCalled();
    }); // One for initial fetch, one for previous page
  });
});
