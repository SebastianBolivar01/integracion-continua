import { render, screen } from "@testing-library/react";
import SolarSystemView from "./SolarSystemView";

// Este archivo contiene pruebas para el componente SolarSystemView.
// Este componente muestra la vista del sistema solar con su título y escena.
// Utilizamos un mock para el componente SolarSystemScene.

// Mock del componente SolarSystemScene para aislar las pruebas
jest.mock("../components/SolarSystemScene", () => ({
  __esModule: true,
  default: () => <div data-testid="solar-system-scene">Solar System Scene</div>,
}));

// Mock del ícono Sun de lucide-react
jest.mock("lucide-react", () => ({
  Sun: () => <div data-testid="sun-icon" />,
}));

describe("SolarSystemView", () => {
  // Prueba que verifica que el título se renderiza correctamente
  it("renders the title", () => {
    render(<SolarSystemView />);
    expect(screen.getByText("Sistema Solar")).toBeInTheDocument();
  });

  // Prueba que verifica que el componente SolarSystemScene se renderiza
  it("renders the SolarSystemScene component", () => {
    render(<SolarSystemView />);
    expect(screen.getByTestId("solar-system-scene")).toBeInTheDocument();
  });

  // Prueba que verifica que el ícono del sol se renderiza
  it("renders the sun icon", () => {
    render(<SolarSystemView />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });
});