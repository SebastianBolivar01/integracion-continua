import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

// Este archivo contiene pruebas para el componente Layout.
// El componente Layout maneja la navegación y decide si mostrar o no el botón de retroceso
// basado en la ruta actual. Utilizamos mocks para simular la navegación.

// Mock de useNavigate para controlar la navegación en las pruebas
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Layout", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // Prueba que verifica que la página principal no muestra el botón de retroceso
  it("renders home page without back button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.queryByText("ATRÁS")).not.toBeInTheDocument();
  });

  // Prueba que verifica que las páginas de actividad muestran el botón de retroceso
  it("renders activity page with back button", () => {
    render(
      <MemoryRouter initialEntries={["/shapes"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText("ATRÁS")).toBeInTheDocument();
  });

  // Prueba que verifica que la página de pintura no muestra el botón de retroceso
  it("does not render back button on paint page", () => {
    render(
      <MemoryRouter initialEntries={["/paint"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.queryByText("<-- Atrás")).not.toBeInTheDocument();
  });

  // Prueba que verifica que el botón de retroceso llama a navigate al hacer clic
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