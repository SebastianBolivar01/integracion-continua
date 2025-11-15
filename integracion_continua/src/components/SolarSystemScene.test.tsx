import { render, screen } from "@testing-library/react";
import SolarSystemScene from "./SolarSystemScene";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn((callback) => {
    // Call the callback to simulate frame update
    callback(0.016, 0); // delta = 16ms
  }),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Ring: () => <div data-testid="orbit-ring" />,
  Stars: () => <div data-testid="stars" />,
}));

describe("SolarSystemScene", () => {
  it("renders the canvas", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  it("renders the sun", () => {
    render(<SolarSystemScene />);
    expect(screen.getByTestId("sun")).toBeInTheDocument();
  });

  it("renders planets", () => {
    render(<SolarSystemScene />);
    // Should render 8 planets
    expect(screen.getByTestId("planet-Mercurio")).toBeInTheDocument();
    expect(screen.getByTestId("planet-Tierra")).toBeInTheDocument();
    expect(screen.getByTestId("planet-Júpiter")).toBeInTheDocument();
  });

  it("shows alert when planet is clicked", () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<SolarSystemScene />);

    const earth = screen.getByTestId("planet-Tierra");
    earth.click();

    expect(mockAlert).toHaveBeenCalledWith("Tierra — planeta del Sistema Solar");
    mockAlert.mockRestore();
  });
});