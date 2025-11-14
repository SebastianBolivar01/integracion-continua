import { render, screen } from "@testing-library/react";
import GlobeScene from "./GlobeScene";

// Mock react-globe.gl
jest.mock("react-globe.gl", () => ({
  __esModule: true,
  default: ({ pointsData, onPointClick }: any) => (
    <div data-testid="globe">
      {pointsData?.map((point: any, index: number) => (
        <div
          key={index}
          data-testid={`globe-point-${index}`}
          onClick={() => onPointClick?.(point)}
        >
          {point.name}
        </div>
      ))}
    </div>
  ),
}));

describe("GlobeScene", () => {
  it("renders the globe component", () => {
    render(<GlobeScene />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
  });

  it("renders the globe component", () => {
    render(<GlobeScene />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
  });

  it("renders country points", () => {
    render(<GlobeScene />);
    // Should render multiple points
    const points = screen.getAllByTestId(/^globe-point-/);
    expect(points.length).toBeGreaterThan(5);
  });

  it("shows alert when point is clicked", () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<GlobeScene />);

    const firstPoint = screen.getByTestId("globe-point-0");
    firstPoint.click();

    expect(mockAlert).toHaveBeenCalled();
    mockAlert.mockRestore();
  });
});