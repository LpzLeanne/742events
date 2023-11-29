import { render, screen } from "@testing-library/react";
import { DataProvider, useData } from "./index";

describe("When a data context is created", () => {
  it("a call is executed on the events.json file", async () => {
    // Mock the fetch function instead of api.loadData
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ result: "ok" }),
    });

    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });

  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      // Mock the fetch function to simulate a failed call
      global.fetch = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      const errorDisplayed = await screen.findByText("error on calling events");
      expect(errorDisplayed).toBeInTheDocument();
    });
  });

  describe("and api.loadData call", () => {
    it("dispatches an error on failed call", async () => {
      // Mock the fetch function to simulate a failed call
      global.fetch = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      const errorDisplayed = await screen.findByText("error on calling events");
      expect(errorDisplayed).toBeInTheDocument();
    });

    it("updates data on successful call", async () => {
      // Mock the fetch function to simulate a successful call
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ rates: { CAD: 1.42 } }),
      });

      const Component = () => {
        const { data } = useData();
        return <div>{data?.rates.CAD}</div>;
      };

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      const dataDisplayed = await screen.findByText("1.42");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
});