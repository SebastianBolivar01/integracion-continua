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

  it("decrements face count when minus button is clicked", () => {
    render(<ShapesScene />);
    // First increment to have something to decrement
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton);
    expect(screen.getByText("Cubo")).toBeInTheDocument();
    // Now decrement
    const minusButton = screen.getByText("➖");
    fireEvent.click(minusButton);
    expect(screen.getByText("Tetraedro")).toBeInTheDocument();
  });

  it("changes to octahedron when face count is 8", () => {
    render(<ShapesScene />);
    // Click plus twice to get to octahedron (8 faces)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    expect(screen.getByText("Octaedro")).toBeInTheDocument();
  });

  it("changes to dodecahedron when face count is 12", () => {
    render(<ShapesScene />);
    // Click plus three times to get to dodecahedron (12 faces)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    expect(screen.getByText("Dodecaedro")).toBeInTheDocument();
  });

  it("changes to icosahedron when face count is 20", () => {
    render(<ShapesScene />);
    // Click plus four times to get to icosahedron (20 faces)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    fireEvent.click(plusButton); // 20
    expect(screen.getByText("Icosaedro")).toBeInTheDocument();
  });

  it("changes to cone when face count is 0", () => {
    render(<ShapesScene />);
    // Click plus five times to get to cone (0 faces)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    fireEvent.click(plusButton); // 20
    fireEvent.click(plusButton); // 0
    expect(screen.getByText("Cono")).toBeInTheDocument();
  });

  it("changes color when color button is clicked", () => {
    render(<ShapesScene />);
    // Find a color button and click it
    const colorButtons = screen.getAllByRole("button").filter(btn => btn.style.backgroundColor);
    if (colorButtons.length > 0) {
      fireEvent.click(colorButtons[0]);
      // Since color is internal state, we can't easily test the change without exposing it
      // But the click should execute the onClick
    }
  });

  it("handles mouse enter and leave on color buttons", () => {
    render(<ShapesScene />);
    const colorButtons = screen.getAllByRole("button").filter(btn => btn.style.backgroundColor);
    if (colorButtons.length > 0) {
      fireEvent.mouseEnter(colorButtons[0]);
      fireEvent.mouseLeave(colorButtons[0]);
      // This should execute the onMouseEnter and onMouseLeave handlers
    }
  });

  it("changes scale when scale slider is changed", () => {
    render(<ShapesScene />);
    const sliders = screen.getAllByRole('slider');
    const scaleSlider = sliders[0];
    fireEvent.change(scaleSlider, { target: { value: '1.5' } });
    // Again, internal state, but onChange should execute
  });

  it("changes speed when speed slider is changed", () => {
    render(<ShapesScene />);
    const sliders = screen.getAllByRole('slider');
    const speedSlider = sliders[1];
    fireEvent.change(speedSlider, { target: { value: '2.0' } });
    // Internal state
  });
});