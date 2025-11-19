import { render, screen } from "@testing-library/react";
import ShapesView from "./ShapesView";

// Este archivo contiene pruebas para el componente ShapesView.
// Este componente es una vista que muestra el título de exploración de formas 3D
// y renderiza el componente ShapesScene. Utilizamos un mock para ShapesScene.

// Mock del componente ShapesScene para aislar las pruebas
jest.mock("../components/ShapesScene", () => ({
  __esModule: true,
  default: () => <div data-testid="shapes-scene">Shapes Scene</div>,
}));

describe("ShapesView", () => {
  // Prueba que verifica que el título se renderiza correctamente
  it("renders the title", () => {
    render(<ShapesView />);
    expect(screen.getByText("Exploración de Formas 3D")).toBeInTheDocument();
  });

  // Prueba que verifica que el componente ShapesScene se renderiza
  it("renders the ShapesScene component", () => {
    render(<ShapesView />);
    expect(screen.getByTestId("shapes-scene")).toBeInTheDocument();
  });
});