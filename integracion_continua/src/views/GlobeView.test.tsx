import { render, screen } from "@testing-library/react";
import GlobeView from "./GlobeView";

// Este archivo contiene pruebas para el componente GlobeView.
// Este componente muestra la vista del globo terráqueo interactivo con su título.
// Utilizamos un mock para el componente GlobeScene.

// Mock del componente GlobeScene para aislar las pruebas
jest.mock("../components/GlobeScene", () => () => <div data-testid="globe-scene" />);

describe("GlobeView", () => {
  // Prueba que verifica que la escena del globo se renderiza
  it("renders the globe scene", () => {
    render(<GlobeView />);
    expect(screen.getByTestId("globe-scene")).toBeInTheDocument();
  });

  // Prueba que verifica que el título se renderiza correctamente
  it("renders the title", () => {
    render(<GlobeView />);
    expect(screen.getByText("Globo Interactivo")).toBeInTheDocument();
  });
});