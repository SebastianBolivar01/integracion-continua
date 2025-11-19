import { render, screen } from "@testing-library/react";
import WaterCycleView from "./WaterCycleView";

// Mock WaterCycleScene
jest.mock("../components/WaterCycleScene", () => ({
  __esModule: true,
  default: () => <div data-testid="water-cycle-scene">Water Cycle Scene</div>,
}));

describe("WaterCycleView", () => {
  it("renders the title", () => {
    render(<WaterCycleView />);
    expect(screen.getByText("Ciclo del Agua")).toBeInTheDocument();
  });

  it("renders the WaterCycleScene component", () => {
    render(<WaterCycleView />);
    expect(screen.getByTestId("water-cycle-scene")).toBeInTheDocument();
  });
});