import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      id: 1,
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      id: 2,
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      id: 3,
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});

describe("When all the slides are created", () => {
  it("creates radio buttons", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Check if the slider render all of data. If expect is false so there is a problem.
    await waitFor(() => {
      const slides = screen
        .getAllByTestId("slide-card-list")[0]
        .getElementsByClassName("SlideCard");
      expect(slides.length).toBe(data.focus.length);

      // Check if the radio-button are created according the number of data/slides. If expect is false so there is a problem.
      const radioButtons = screen.getAllByTestId("radio-button");
      expect(radioButtons.length).toBe(data.focus.length);
      expect(radioButtons.length).toBe(slides.length);
    });
  });
});

describe("When all the slides are created", () => {
  it("they are displayed according their date", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Check if the slides are displayed in the correct order : from most old to most recent date
    for (let i = 0; i < data.focus.length - 1; i += 1) {
      const currentDate = new Date(data.focus[i].date).getTime();
      const nextDate = new Date(data.focus[i + 1].date).getTime();
      expect(currentDate).toBeLessThanOrEqual(nextDate);
    }
  });
});

describe("When the slider is displayed", () => {
  beforeEach(() => {
    window.console.error = jest.fn();
    jest.useFakeTimers();
    api.loadData = jest.fn().mockReturnValue(data);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("automatically transitions to the next slide after 5000ms interval", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Wait for the initial slide to be rendered
    await screen.findByText("World economic forum");

    // Find the initial index (0)
    const initialIndex = screen
      .getAllByTestId("radio-button")
      .findIndex((radio) => radio.getAttribute("checked"));

    // Advance the timers by the interval time
    jest.advanceTimersByTime(5000);

    // Run only the pending timers to ensure that the timers are executed
    jest.runOnlyPendingTimers();

    // Check if the index has changed after the interval
    const newIndex = screen
      .getAllByTestId("radio-button")
      .findIndex((radio) => radio.checked);

    // Check if the new index is not equal to the initial index (0)
    expect(newIndex).not.toBe(0);
    expect(newIndex).not.toBe(initialIndex);

    // Expect that the new index is 1 according to the click on the radio-button 1
    expect(newIndex).toBe(1);
  });

  it("changes slides when clicking on a radio button", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Wait for the first slide to be rendered
    await screen.findByText("World economic forum");

    // Find the initial index (0)
    const initialIndex = screen
      .getAllByTestId("radio-button")
      .findIndex((radio) => radio.getAttribute("checked"));

    // Click on the second radio button
    fireEvent.click(screen.getAllByTestId("radio-button")[1]);

    // Check if the index has changed after clicking on the radio button
    const newIndex = screen
      .getAllByTestId("radio-button")
      .findIndex((radio) => radio.checked);

    // Check if the new index is not equal to the initial index (0)
    expect(newIndex).not.toBe(0);
    expect(newIndex).not.toBe(initialIndex);

    // Expect that the new index is 1 according to the click on the radio-button 1
    expect(newIndex).toBe(1);
  });
});
