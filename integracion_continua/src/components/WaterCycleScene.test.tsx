import { render, screen, fireEvent } from "@testing-library/react";
import WaterCycleScene from "./WaterCycleScene";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  extend: jest.fn(),
}));

// Mock @react-three/drei
jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Text: () => null,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Play: () => <span>Play</span>,
  Pause: () => <span>Pause</span>,
  RotateCcw: () => <span>RotateCcw</span>,
  Info: () => <span>Info</span>,
}));

// Mock HTMLCanvasElement
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
  it("renders the canvas", () => {
    render(<WaterCycleScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  it("renders the controls menu", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("Controles")).toBeInTheDocument();
  });

  it("renders control buttons", () => {
    render(<WaterCycleScene />);
    // Verificar que los botones de control están presentes (usando sus roles o accessibility)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("shows current phase indicator", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("Fase actual:")).toBeInTheDocument();
  });

  it("renders speed control", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("Velocidad:")).toBeInTheDocument();
  });

  it("toggles info panel when info button is clicked", () => {
    render(<WaterCycleScene />);
    const infoButton = screen.getByRole("button", { name: /info/i });
    fireEvent.click(infoButton);
    expect(screen.getByText("¿Qué es el ciclo del agua?")).toBeInTheDocument();
  });

  it("renders progress indicator", () => {
    render(<WaterCycleScene />);
    // Verificar que hay un indicador de porcentaje
    const percentageText = screen.getByText(/\d+%/);
    expect(percentageText).toBeInTheDocument();
  });
});