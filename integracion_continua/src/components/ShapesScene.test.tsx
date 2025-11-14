import { render, screen, fireEvent } from "@testing-library/react";
import ShapesScene from "./ShapesScene";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
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

describe("ShapesScene", () => {
  it("renders the controls menu", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Controles Mágicos")).toBeInTheDocument();
  });

  it("renders shape selector", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Número de Caras")).toBeInTheDocument();
  });

  it("renders color picker buttons", () => {
    render(<ShapesScene />);
    // Should have multiple color buttons
    const colorButtons = screen.getAllByRole("button");
    expect(colorButtons.length).toBeGreaterThan(10); // At least the color buttons
  });

  it("renders scale slider", () => {
    render(<ShapesScene />);
    expect(screen.getByText(/Escala:/)).toBeInTheDocument();
  });

  it("renders speed slider", () => {
    render(<ShapesScene />);
    expect(screen.getByText(/Velocidad:/)).toBeInTheDocument();
  });

  it("changes shape when face count changes", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Tetraedro")).toBeInTheDocument();
    // Click the plus button to change to cube (6 faces)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton);
    expect(screen.getByText("Cubo")).toBeInTheDocument();
  });
});