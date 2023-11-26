import { fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(
        () => {
          expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
        },
        { timeout: 10000 }
      );
    });
  });
});


describe("When a page is created", () => {
  it("renders the header with the menu", async () => {
    render(<Home />);
    const header = screen.getByTestId("header-testid");
    const menu = within(header).getByTestId("menu-testid");
    expect(menu).toBeInTheDocument();
  });
  
  it("the slider section is displayed", async () => {
    render(<Home />);
    const sliderSection = screen.getByTestId("slider-testid");
    expect(sliderSection).toBeInTheDocument();
  });

  it("the services section is displayed with service cards", async () => {
    render(<Home />);
    const servicesSections = screen.getAllByText("Nos services");
    expect(servicesSections.length).toBeGreaterThan(0);

    const serviceCards = screen.getAllByTestId("service-card-testid");
    expect(serviceCards.length).toBeGreaterThan(0);
  });

  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventsSection = screen.getByTestId("events-section-testid");
    const eventList = within(eventsSection).getByTestId("event-list-testid");
    expect(eventList).toBeInTheDocument();
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    const peopleSection = screen.getByTestId("people-section-testid");
    const peopleCards = within(peopleSection).getAllByTestId("people-card-testid");
    expect(peopleCards.length).toBeGreaterThan(0);
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    const lastEventCard = within(footer).getByTestId("last-event-testid");
    expect(lastEventCard).toBeInTheDocument();
});

  it("a contact information are displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    const contactDetails = within(footer).getByTestId("contact-details-testid");
    expect(contactDetails).toBeInTheDocument();
  })
})

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
    },

    {
      id: 2,
      type: "forum",
      date: "2022-05-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
    },
    ]
};

describe("When events are created", () => {
  it('sorts events by date in descending order', async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    });

    const eventList = screen.getByTestId('event-list-testid');
    const eventDates = Array.from(eventList.children).map((event) =>
      new Date(event.getAttribute('data-date')).getTime()
    );

    for (let i = 0; i < eventDates.length - 1; i += 1) {
      expect(eventDates[i]).toBeGreaterThanOrEqual(eventDates[i + 1]);
    }
  });
});
