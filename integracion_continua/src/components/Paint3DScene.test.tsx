import { render, screen } from "@testing-library/react";
import Paint3DScene from "./Paint3DScene";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children, ...props }: any) => <div data-testid="canvas" {...props}>{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

describe("Paint3DScene", () => {
  it("renders the paint controls", () => {
    render(<Paint3DScene />);
    expect(screen.getByText("Controles de Pintura")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Limpiar")).toBeInTheDocument();
  });

  it("renders the instruction text", () => {
    render(<Paint3DScene />);
    expect(screen.getByText("Haz clic en el espacio 3D para pintar puntos de color.")).toBeInTheDocument();
  });
});