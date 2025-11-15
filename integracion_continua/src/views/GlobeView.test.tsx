import { render, screen } from "@testing-library/react";
import GlobeView from "./GlobeView";

// Mock GlobeScene
jest.mock("../components/GlobeScene", () => () => <div data-testid="globe-scene" />);

describe("GlobeView", () => {
  it("renders the globe scene", () => {
    render(<GlobeView />);
    expect(screen.getByTestId("globe-scene")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<GlobeView />);
    expect(screen.getByText("Globo Interactivo")).toBeInTheDocument();
  });
});