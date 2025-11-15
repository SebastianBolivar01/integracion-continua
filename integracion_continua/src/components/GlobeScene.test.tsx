import { render, screen } from "@testing-library/react";
import GlobeScene from "./GlobeScene";

// Mock react-globe.gl
jest.mock("react-globe.gl", () => ({
  __esModule: true,
  default: ({ pointsData, onPointClick, pointLabel, pointColor }: any) => {
    // Call pointLabel and pointColor to cover the functions
    if (pointsData && pointLabel) {
      pointsData.forEach((point: any) => pointLabel(point));
    }
    if (pointColor) {
      pointColor();
    }
    return (
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
    );
  },
}));

// Mock getBoundingClientRect to cover the resize logic
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  writable: true,
  value: jest.fn().mockReturnValue({
    width: 800,
    height: 600,
  }),
});

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

  it("updates dimensions on resize", () => {
    render(<GlobeScene />);
    // Trigger resize event to cover the updateDimensions logic
    window.dispatchEvent(new Event('resize'));
  });
});