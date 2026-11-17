import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BookPage } from "./pages/BookPage";
import { EventsPage } from "./pages/EventsPage";
import { GalleryPage } from "./pages/GalleryPage";

jest.mock("./services/bookingService", () => ({ submitBooking: jest.fn() }));
jest.mock("./data/siteContent", () => {
  const actual = jest.requireActual("./data/siteContent");
  const bootcamp = actual.events.find(
    (event) => event.title === "4 Week Bootcamp",
  );
  return {
    ...actual,
    upcomingEvents: [bootcamp],
    bookingOptions: [bootcamp.title],
    pastEvents: actual.events.filter((event) => event !== bootcamp),
  };
});

test("booking preserves event selection, drop-in pricing and ticket totals", () => {
  render(
    <BookPage search="?event=4%20Week%20Bootcamp&email=guest%40example.com" />,
  );
  expect(screen.getByLabelText("Select Event")).toHaveValue("4 Week Bootcamp");
  expect(screen.getByLabelText("Email")).toHaveValue("guest@example.com");
  fireEvent.click(screen.getByRole("button", { name: /Drop In/ }));
  fireEvent.change(screen.getByLabelText("Number of Tickets"), {
    target: { value: "2" },
  });
  expect(
    document.querySelector(".booking-form__total-amount"),
  ).toHaveTextContent(/400/);
});

test("an archived event cannot be preselected by an old booking URL", () => {
  render(<BookPage search="?event=Pilates%20%26%20Brunch" />);
  expect(screen.getByLabelText("Select Event")).toHaveValue("");
  expect(
    screen.queryByRole("option", { name: "Pilates & Brunch" }),
  ).not.toBeInTheDocument();
});

test("the archive starts collapsed and contains no booking links", () => {
  render(<EventsPage currentPath="/events" navigate={jest.fn()} search="" />);
  const archive = document.querySelector("details");
  expect(archive).not.toHaveAttribute("open");
  expect(within(archive).getByText("Pilates & Brunch")).toBeInTheDocument();
  expect(within(archive).queryByRole("link")).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Book Now" })).toHaveLength(1);
});

test("the scrapbook supports keyboard browsing, closing and focus restoration", () => {
  render(<GalleryPage />);
  const opener = screen.getByRole("button", { name: "View You, Me & Pilates" });
  fireEvent.click(opener);
  expect(
    screen.getByRole("dialog", { name: "You, Me & Pilates" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Close photo" })).toHaveFocus();
  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(
    screen.getByRole("dialog", { name: "Movement in the Park" }),
  ).toBeInTheDocument();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
  expect(document.body.style.overflow).not.toBe("hidden");
});
