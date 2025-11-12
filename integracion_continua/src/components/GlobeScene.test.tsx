import { render, screen } from "@testing-library/react";
import React from "react";
import GlobeScene from "./GlobeScene";

// 🔹 Mock de react-globe.gl (evita renderizar WebGL real)
jest.mock("react-globe.gl", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="mock-globe">Globe Mock</div>),
  };
});

describe("GlobeScene component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<GlobeScene />);

    // Verifica que aparezca el título
    expect(screen.getByText(/Información/i)).toBeInTheDocument();

    // Verifica que aparezcan los países en la lista
    expect(screen.getByText(/Colombia/i)).toBeInTheDocument();
    expect(screen.getByText(/España/i)).toBeInTheDocument();
    expect(screen.getByText(/Reino Unido/i)).toBeInTheDocument();

    // Verifica que el componente Globe se haya renderizado (mock)
    expect(screen.getByTestId("mock-globe")).toBeInTheDocument();
  });

  it("renders list items for each country", () => {
    render(<GlobeScene />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3); // hay 3 países
  });
});
