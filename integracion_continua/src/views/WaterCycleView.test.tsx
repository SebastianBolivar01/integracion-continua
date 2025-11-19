import { render, screen } from "@testing-library/react";
import WaterCycleView from "./WaterCycleView";

// Este archivo contiene pruebas para el componente WaterCycleView.
// Este componente muestra la vista del ciclo del agua con su título y escena.
// Utilizamos un mock para el componente WaterCycleScene.

// Mock del componente WaterCycleScene para aislar las pruebas
jest.mock("../components/WaterCycleScene", () => ({
  __esModule: true,
  default: () => <div data-testid="water-cycle-scene">Water Cycle Scene</div>,
}));

describe("WaterCycleView", () => {
  // Prueba que verifica que el título se renderiza correctamente
  it("renders the title", () => {
    render(<WaterCycleView />);
    expect(screen.getByText("Ciclo del Agua")).toBeInTheDocument();
  });

  // Prueba que verifica que el componente WaterCycleScene se renderiza
  it("renders the WaterCycleScene component", () => {
    render(<WaterCycleView />);
    expect(screen.getByTestId("water-cycle-scene")).toBeInTheDocument();
  });
});