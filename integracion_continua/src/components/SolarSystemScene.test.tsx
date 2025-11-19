import { render, screen, fireEvent } from "@testing-library/react";
import SolarSystemScene from "./SolarSystemScene";

// Este archivo contiene pruebas para el componente SolarSystemScene.
// Este componente renderiza una escena 3D del sistema solar con planetas orbitando alrededor del sol.
// Los usuarios pueden hacer clic en los planetas para obtener información.
// Utilizamos mocks para simular las librerías de Three.js.

// Mock de componentes de Three.js para evitar dependencias en las pruebas
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Ring: ({ children }: any) => <div data-testid="ring">{children}</div>,
  Stars: () => <div data-testid="stars" />,
}));

// Mock de THREE para evitar importaciones
jest.mock("three", () => ({
  DoubleSide: "DoubleSide",
  Mesh: jest.fn(),
  SphereGeometry: jest.fn(),
  MeshStandardMaterial: jest.fn(),
  RingGeometry: jest.fn(),
  MeshBasicMaterial: jest.fn(),
}));

describe("SolarSystemScene", () => {
  // Prueba que verifica que el canvas se renderiza correctamente
  it("renders the canvas", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que el sol se renderiza en el centro
  it("renders the sun", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("sun")).toBeInTheDocument();
  });

  // Prueba que verifica que todos los planetas se renderizan
  it("renders all planets", () => {
    render(<SolarSystemScene />);
    const planetNames = ["Mercurio", "Venus", "Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"];

    planetNames.forEach(name => {
      expect(screen.getByTestId(`planet-${name}`)).toBeInTheDocument();
    });
  });

  // Prueba que verifica que las órbitas se renderizan para cada planeta
  it("renders orbits for all planets", () => {
    render(<SolarSystemScene />);
    const rings = screen.getAllByTestId("ring");
    expect(rings.length).toBe(8); // Una órbita por planeta
  });

  // Prueba que verifica que las estrellas de fondo se renderizan
  it("renders background stars", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("stars")).toBeInTheDocument();
  });

  // Prueba que verifica que hacer clic en un planeta muestra una alerta
  it("shows alert when planet is clicked", () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<SolarSystemScene />);

    const earth = screen.getByTestId("planet-Tierra");
    fireEvent.click(earth);

    expect(mockAlert).toHaveBeenCalledWith("Tierra — planeta del Sistema Solar");
    mockAlert.mockRestore();
  });

  // Prueba que verifica que los controles de órbita se renderizan
  it("renders orbit controls", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("orbit-controls")).toBeInTheDocument();
  });
});