import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Layout", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders home page without back button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.queryByText("ATRÁS")).not.toBeInTheDocument();
  });

  it("renders activity page with back button", () => {
    render(
      <MemoryRouter initialEntries={["/shapes"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText("ATRÁS")).toBeInTheDocument();
  });

  it("does not render back button on paint page", () => {
    render(
      <MemoryRouter initialEntries={["/paint"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.queryByText("<-- Atrás")).not.toBeInTheDocument();
  });

  it("back button calls navigate when clicked", () => {
    render(
      <MemoryRouter initialEntries={["/shapes"]}>
        <Layout />
      </MemoryRouter>
    );

    const backButton = screen.getByText("ATRÁS");
    backButton.click();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});