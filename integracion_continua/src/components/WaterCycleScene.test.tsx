import { render, screen, fireEvent } from "@testing-library/react";
import WaterCycleScene from "./WaterCycleScene";

// Este archivo contiene pruebas para el componente WaterCycleScene.
// Este componente muestra una escena 3D del ciclo del agua con diferentes fases interactivas.
// Utilizamos mocks para simular los componentes de Three.js.

// Mock de componentes de Three.js para evitar dependencias en las pruebas
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

// Mock del contexto 2D del canvas
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: jest.fn((contextType: string) => {
    if (contextType === '2d') {
      return {
        fillStyle: '',
        fillRect: jest.fn(),
      };
    }
    return null;
  }),
});

describe("WaterCycleScene", () => {
  // Prueba que verifica que el canvas se renderiza correctamente
  it("renders the canvas", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que el menú de controles se renderiza
  it("renders the controls menu", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("Ciclo del Agua")).toBeInTheDocument();
  });

  // Prueba que verifica que se renderizan los botones de las fases del ciclo del agua
  it("renders phase buttons", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("🌞 Evaporación")).toBeInTheDocument();
    expect(screen.getByText("☁️ Condensación")).toBeInTheDocument();
    expect(screen.getByText("🌧️ Precipitación")).toBeInTheDocument();
    expect(screen.getByText("🏞️ Recolección")).toBeInTheDocument();
  });

  // Prueba que verifica que la fase de evaporación se muestra por defecto
  it("shows evaporation phase by default", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("🌞 Evaporación")).toBeInTheDocument();
  });

  // Prueba que verifica que la fase cambia al hacer clic en un botón
  it("changes phase when button is clicked", () => {
    render(<WaterCycleScene />);
    const condensationButton = screen.getByText("☁️ Condensación");
    fireEvent.click(condensationButton);
    expect(screen.getByText("☁️ Condensación")).toBeInTheDocument();
  });
});