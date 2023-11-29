import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });
});

describe("and a click is triggered on Nos services", () => {
  it("document location href change", async () => {
    render(<Menu />);
    fireEvent(
      await screen.findByText("Nos services"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    expect(window.document.location.hash).toEqual("#nos-services");
  });
});

describe("and a click is triggered on Nos réalisations", () => {
  it("document location href change", async () => {
    render(<Menu />);
    fireEvent(
      await screen.findByText("Nos réalisations"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    expect(window.document.location.hash).toEqual("#nos-realisations");
  });
});

describe("and a click is triggered on Notre équipe", () => {
  it("document location href change", async () => {
    render(<Menu />);
    fireEvent(
      await screen.findByText("Notre équipe"),
      new MouseEvent("click", {
        cancelable: true,
        bubbles: true,
      })
    );
    expect(window.document.location.hash).toEqual("#notre-equipe");
  });
});