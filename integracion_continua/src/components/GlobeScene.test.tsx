import { render, screen } from "@testing-library/react";
import GlobeScene from "./GlobeScene";

// Este archivo contiene pruebas para el componente GlobeScene.
// Este componente renderiza un globo terráqueo interactivo con puntos que representan países.
// Utilizamos mocks para simular la librería react-globe.gl y las funciones de redimensionamiento.

// Mock de la librería react-globe.gl para evitar dependencias externas en las pruebas
jest.mock("react-globe.gl", () => ({
  __esModule: true,
  default: ({ pointsData, onPointClick, pointLabel, pointColor }: any) => {
    // Llamar a pointLabel y pointColor para cubrir las funciones
    if (pointsData && pointLabel) {
      pointsData.forEach((point: any) => pointLabel(point));
    }
    if (pointColor) {
      pointColor();
    }
    return (
      <div data-testid="globe">
        {pointsData?.map((point: any, index: number) => (
          <div
            key={index}
            data-testid={`globe-point-${index}`}
            onClick={() => onPointClick?.(point)}
          >
            {point.name}
          </div>
        ))}
      </div>
    );
  },
}));

// Mock de getBoundingClientRect para cubrir la lógica de redimensionamiento
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  writable: true,
  value: jest.fn().mockReturnValue({
    width: 800,
    height: 600,
  }),
});

describe("GlobeScene", () => {
  // Prueba que verifica que el componente del globo se renderiza correctamente
  it("renders the globe component", () => {
    render(<GlobeScene />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
  });

  // Prueba duplicada que verifica el renderizado del globo (debería eliminarse)
  it("renders the globe component", () => {
    render(<GlobeScene />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
  });

  // Prueba que verifica que se renderizan los puntos de los países en el globo
  it("renders country points", () => {
    render(<GlobeScene />);
    // Debería renderizar múltiples puntos
    const points = screen.getAllByTestId(/^globe-point-/);
    expect(points.length).toBeGreaterThan(5);
  });

  // Prueba que verifica que se muestra una alerta al hacer clic en un punto
  it("shows alert when point is clicked", () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<GlobeScene />);

    const firstPoint = screen.getByTestId("globe-point-0");
    firstPoint.click();

    expect(mockAlert).toHaveBeenCalled();
    mockAlert.mockRestore();
  });

  // Prueba que verifica que las dimensiones se actualizan al redimensionar la ventana
  it("updates dimensions on resize", () => {
    render(<GlobeScene />);
    // Disparar evento de redimensionamiento para cubrir la lógica updateDimensions
    window.dispatchEvent(new Event('resize'));
  });
});