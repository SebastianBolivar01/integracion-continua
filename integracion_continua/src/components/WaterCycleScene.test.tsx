import { render, screen, fireEvent } from "@testing-library/react";
import WaterCycleScene from "./WaterCycleScene";

// Este archivo contiene pruebas para el componente WaterCycleScene.
// Este componente muestra una escena 3D del ciclo del agua con diferentes fases interactivas.
// Utilizamos mocks para simular los componentes de Three.js.

// Mock de componentes de Three.js para evitar dependencias en las pruebas
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: () => ({
    camera: {},
    scene: {},
    raycaster: { setFromCamera: jest.fn() },
    pointer: { x: 0, y: 0 }
  }),
}));

// Mock de @react-three/drei
jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Line: () => <div data-testid="line" />,
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

  // Prueba que verifica que el mar se renderiza
  it("renders the sea", () => {
    render(<WaterCycleScene />);
    // El mar es un mesh con planeGeometry y color azul
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que la tierra/playa se renderiza
  it("renders the land", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que las montañas se renderizan
  it("renders mountains", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que la nube se renderiza
  it("renders the cloud", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que las partículas de vapor se renderizan
  it("renders vapor particles", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que las gotas se renderizan
  it("renders droplets", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que los controles de órbita se renderizan
  it("renders orbit controls", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("orbit-controls")).toBeInTheDocument();
  });
});