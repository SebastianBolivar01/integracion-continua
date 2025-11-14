import { render, screen } from "@testing-library/react";
import ShapesView from "./ShapesView";

// Mock ShapesScene
jest.mock("../components/ShapesScene", () => ({
  __esModule: true,
  default: () => <div data-testid="shapes-scene">Shapes Scene</div>,
}));

describe("ShapesView", () => {
  it("renders the title", () => {
    render(<ShapesView />);
    expect(screen.getByText("Exploración de Formas 3D")).toBeInTheDocument();
  });

  it("renders the ShapesScene component", () => {
    render(<ShapesView />);
    expect(screen.getByTestId("shapes-scene")).toBeInTheDocument();
  });
});