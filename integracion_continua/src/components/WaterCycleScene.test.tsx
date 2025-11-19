import { render, screen, fireEvent } from "@testing-library/react";
import WaterCycleScene from "./WaterCycleScene";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
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
    expect(screen.getByText("Ciclo del Agua")).toBeInTheDocument();
  });

  it("renders phase buttons", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("🌞 Evaporación")).toBeInTheDocument();
    expect(screen.getByText("☁️ Condensación")).toBeInTheDocument();
    expect(screen.getByText("🌧️ Precipitación")).toBeInTheDocument();
    expect(screen.getByText("🏞️ Recolección")).toBeInTheDocument();
  });

  it("shows evaporation phase by default", () => {
    render(<WaterCycleScene />);
    expect(screen.getByText("🌞 Evaporación")).toBeInTheDocument();
  });

  it("changes phase when button is clicked", () => {
    render(<WaterCycleScene />);
    const condensationButton = screen.getByText("☁️ Condensación");
    fireEvent.click(condensationButton);
    expect(screen.getByText("☁️ Condensación")).toBeInTheDocument();
  });
});