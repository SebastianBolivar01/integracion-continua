import { render, screen } from "@testing-library/react";
import PaintView from "./PaintView";

// Este archivo contiene pruebas para el componente PaintView.
// Este componente muestra la vista de pintura 3D con su título y escena.
// Utilizamos un mock para el componente PaintScene.

// Mock del componente PaintScene para aislar las pruebas
jest.mock("../components/PaintScene", () => ({
  __esModule: true,
  default: () => <div data-testid="paint-scene">Paint Scene</div>,
}));

// Mock del ícono Palette de lucide-react
jest.mock("lucide-react", () => ({
  Palette: () => <div data-testid="palette-icon" />,
}));

describe("PaintView", () => {
  // Prueba que verifica que el título se renderiza correctamente
  it("renders the title", () => {
    render(<PaintView />);
    expect(screen.getByText("Pintura 3D - Espacio Creativo")).toBeInTheDocument();
  });

  // Prueba que verifica que el componente PaintScene se renderiza
  it("renders the PaintScene component", () => {
    render(<PaintView />);
    expect(screen.getByTestId("paint-scene")).toBeInTheDocument();
  });

  // Prueba que verifica que el ícono de la paleta se renderiza
  it("renders the palette icon", () => {
    render(<PaintView />);
    expect(screen.getByTestId("palette-icon")).toBeInTheDocument();
  });
});