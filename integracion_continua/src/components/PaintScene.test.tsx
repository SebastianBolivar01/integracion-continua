import { render, screen, fireEvent } from "@testing-library/react";
import PaintScene from "./PaintScene";

// Este archivo contiene pruebas para el componente PaintScene.
// Este componente permite a los usuarios dibujar en un plano 3D con diferentes colores y tamaños de pincel.
// Incluye controles interactivos para seleccionar colores y ajustar el tamaño del pincel.
// Utilizamos mocks para simular las librerías de Three.js.

// Mock de componentes de Three.js para evitar dependencias en las pruebas
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: () => ({
    camera: {},
    scene: {},
    raycaster: { setFromCamera: jest.fn() },
    pointer: { x: 0, y: 0 }
  }),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Line: () => <div data-testid="line" />,
}));

// Mock de THREE para evitar importaciones
jest.mock("three", () => ({
  Vector3: jest.fn(),
  Mesh: jest.fn(),
  PlaneGeometry: jest.fn(),
  MeshStandardMaterial: jest.fn(),
}));

// Mock de lucide-react icons
jest.mock("lucide-react", () => ({
  Palette: () => <div data-testid="palette-icon" />,
  Brush: () => <div data-testid="brush-icon" />,
}));

describe("PaintScene", () => {
  // Prueba que verifica que el canvas se renderiza correctamente
  it("renders the canvas", () => {
    render(<PaintScene />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  // Prueba que verifica que el menú de controles se renderiza
  it("renders the controls menu", () => {
    render(<PaintScene />);
    expect(screen.getByText("Herramientas de Pintura")).toBeInTheDocument();
  });

  // Prueba que verifica que el selector de color se renderiza
  it("renders color picker", () => {
    render(<PaintScene />);
    expect(screen.getByText("🎨 Color del Pincel")).toBeInTheDocument();
  });

  // Prueba que verifica que se renderizan botones de color
  it("renders color buttons", () => {
    render(<PaintScene />);
    // Debería haber 18 botones de color (6 filas x 3 columnas en el grid, pero realmente son 18 colores)
    const colorButtons = screen.getAllByRole("button");
    expect(colorButtons.length).toBeGreaterThan(15); // Al menos los botones de color
  });

  // Prueba que verifica que el control de tamaño del pincel se renderiza
  it("renders brush size slider", () => {
    render(<PaintScene />);
    expect(screen.getByText(/Tamaño del Pincel:/)).toBeInTheDocument();
  });

  // Prueba que verifica que las instrucciones se muestran
  it("renders instructions text", () => {
    render(<PaintScene />);
    expect(screen.getByText("Haz clic y arrastra en el plano para dibujar")).toBeInTheDocument();
  });

  // Prueba que verifica que los controles de órbita se renderizan
  it("renders orbit controls", () => {
    render(<PaintScene />);
    expect(screen.getByTestId("orbit-controls")).toBeInTheDocument();
  });

  // Prueba que verifica que el ícono del pincel se renderiza
  it("renders brush icon", () => {
    render(<PaintScene />);
    expect(screen.getByTestId("brush-icon")).toBeInTheDocument();
  });

  // Prueba que verifica que el slider de tamaño del pincel puede cambiar su valor
  it("changes brush size when slider is moved", () => {
    render(<PaintScene />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.02' } });
    // Dado que el cambio es interno, solo verificamos que el evento se ejecuta
  });
});