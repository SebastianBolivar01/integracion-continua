import { render, screen } from "@testing-library/react";
import SolarSystemView from "./SolarSystemView";

// Mock SolarSystemScene
jest.mock("../components/SolarSystemScene", () => ({
  __esModule: true,
  default: () => <div data-testid="solar-system-scene">Solar System Scene</div>,
}));

describe("SolarSystemView", () => {
  it("renders the title", () => {
    render(<SolarSystemView />);
    expect(screen.getByText("Sistema Solar")).toBeInTheDocument();
  });

  it("renders the SolarSystemScene component", () => {
    render(<SolarSystemView />);
    expect(screen.getByTestId("solar-system-scene")).toBeInTheDocument();
  });
});