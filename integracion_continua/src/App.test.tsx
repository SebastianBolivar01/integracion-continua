import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock react-globe.gl
jest.mock("react-globe.gl", () => ({
  __esModule: true,
  default: () => <div data-testid="globe-mock" />,
}));

// Mock BrowserRouter to use MemoryRouter in tests
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App", () => {
  it("renders the app without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Should render something, at least the layout
    expect(document.body).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("¡Bienvenido a la Aventura Educativa!")).toBeInTheDocument();
  });
});