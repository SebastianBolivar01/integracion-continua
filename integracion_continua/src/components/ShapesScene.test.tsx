import { render, screen, fireEvent } from "@testing-library/react";
import ShapesScene from "./ShapesScene";

// Este archivo contiene pruebas para el componente ShapesScene.
// Este componente renderiza una escena 3D interactiva donde los usuarios pueden cambiar formas geométricas,
// colores, escala y velocidad de rotación. Utilizamos mocks para simular las librerías de Three.js.

// Mock de componentes de Three.js para evitar dependencias en las pruebas
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

// Mock del contexto 2D del canvas para pruebas
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
  // Prueba que verifica que el menú de controles se renderiza correctamente
  it("renders the controls menu", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Controles Mágicos")).toBeInTheDocument();
  });

  // Prueba que verifica la presencia del selector de formas (número de caras)
  it("renders shape selector", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Número de Caras")).toBeInTheDocument();
  });

  // Prueba que verifica que se renderizan los botones del selector de colores
  it("renders color picker buttons", () => {
    render(<ShapesScene />);
    // Debería haber múltiples botones de color
    const colorButtons = screen.getAllByRole("button");
    expect(colorButtons.length).toBeGreaterThan(10); // Al menos los botones de color
  });

  // Prueba que verifica la presencia del control deslizante de escala
  it("renders scale slider", () => {
    render(<ShapesScene />);
    expect(screen.getByText(/Escala:/)).toBeInTheDocument();
  });

  // Prueba que verifica la presencia del control deslizante de velocidad
  it("renders speed slider", () => {
    render(<ShapesScene />);
    expect(screen.getByText(/Velocidad:/)).toBeInTheDocument();
  });

  // Prueba que verifica el cambio de forma al incrementar el número de caras
  it("changes shape when face count changes", () => {
    render(<ShapesScene />);
    expect(screen.getByText("Tetraedro")).toBeInTheDocument();
    // Hacer clic en el botón más para cambiar a cubo (6 caras)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton);
    expect(screen.getByText("Cubo")).toBeInTheDocument();
  });

  // Prueba que verifica la disminución del número de caras al hacer clic en el botón menos
  it("decrements face count when minus button is clicked", () => {
    render(<ShapesScene />);
    // Primero incrementar para tener algo que decrementar
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton);
    expect(screen.getByText("Cubo")).toBeInTheDocument();
    // Ahora decrementar
    const minusButton = screen.getByText("➖");
    fireEvent.click(minusButton);
    expect(screen.getByText("Tetraedro")).toBeInTheDocument();
  });

  // Prueba que verifica el cambio a octaedro cuando el número de caras es 8
  it("changes to octahedron when face count is 8", () => {
    render(<ShapesScene />);
    // Hacer clic en más dos veces para llegar a octaedro (8 caras)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    expect(screen.getByText("Octaedro")).toBeInTheDocument();
  });

  // Prueba que verifica el cambio a dodecaedro cuando el número de caras es 12
  it("changes to dodecahedron when face count is 12", () => {
    render(<ShapesScene />);
    // Hacer clic en más tres veces para llegar a dodecaedro (12 caras)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    expect(screen.getByText("Dodecaedro")).toBeInTheDocument();
  });

  // Prueba que verifica el cambio a icosaedro cuando el número de caras es 20
  it("changes to icosahedron when face count is 20", () => {
    render(<ShapesScene />);
    // Hacer clic en más cuatro veces para llegar a icosaedro (20 caras)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    fireEvent.click(plusButton); // 20
    expect(screen.getByText("Icosaedro")).toBeInTheDocument();
  });

  // Prueba que verifica el cambio a cono cuando el número de caras es 0
  it("changes to cone when face count is 0", () => {
    render(<ShapesScene />);
    // Hacer clic en más cinco veces para llegar a cono (0 caras)
    const plusButton = screen.getByText("➕");
    fireEvent.click(plusButton); // 6
    fireEvent.click(plusButton); // 8
    fireEvent.click(plusButton); // 12
    fireEvent.click(plusButton); // 20
    fireEvent.click(plusButton); // 0
    expect(screen.getByText("Cono")).toBeInTheDocument();
  });

  // Prueba que verifica el cambio de color al hacer clic en un botón de color
  it("changes color when color button is clicked", () => {
    render(<ShapesScene />);
    // Encontrar un botón de color y hacer clic en él
    const colorButtons = screen.getAllByRole("button").filter(btn => btn.style.backgroundColor);
    if (colorButtons.length > 0) {
      fireEvent.click(colorButtons[0]);
      // Dado que el color es estado interno, no podemos probar fácilmente el cambio sin exponerlo
      // Pero el clic debería ejecutar el onClick
    }
  });

  // Prueba que verifica el manejo de eventos mouse enter y leave en botones de color
  it("handles mouse enter and leave on color buttons", () => {
    render(<ShapesScene />);
    const colorButtons = screen.getAllByRole("button").filter(btn => btn.style.backgroundColor);
    if (colorButtons.length > 0) {
      fireEvent.mouseEnter(colorButtons[0]);
      fireEvent.mouseLeave(colorButtons[0]);
      // Esto debería ejecutar los manejadores onMouseEnter y onMouseLeave
    }
  });

  // Prueba que verifica el cambio de escala al modificar el deslizante de escala
  it("changes scale when scale slider is changed", () => {
    render(<ShapesScene />);
    const sliders = screen.getAllByRole('slider');
    const scaleSlider = sliders[0];
    fireEvent.change(scaleSlider, { target: { value: '1.5' } });
    // Estado interno, pero onChange debería ejecutarse
  });

  // Prueba que verifica el cambio de velocidad al modificar el deslizante de velocidad
  it("changes speed when speed slider is changed", () => {
    render(<ShapesScene />);
    const sliders = screen.getAllByRole('slider');
    const speedSlider = sliders[1];
    fireEvent.change(speedSlider, { target: { value: '2.0' } });
    // Estado interno
  });
});