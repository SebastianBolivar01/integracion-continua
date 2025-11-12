// SolarSystemScene.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SolarSystemScene from "../components/SolarSystemScene"; // Ajusta la ruta si es necesario

// Mock de Canvas para evitar errores de WebGL
jest.mock('@react-three/fiber', () => {
  return {
    Canvas: ({ children }: any) => <div>{children}</div>,
    useFrame: () => {}, // Si tu componente usa useFrame
  };
});

// Mock de la función alert
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("SolarSystemScene Component", () => {
  test("renderiza todos los planetas", () => {
    render(<SolarSystemScene />);

    // Verificar que los planetas estén en el documento
    expect(screen.getByText("Mercurio")).toBeInTheDocument();
    expect(screen.getByText("Venus")).toBeInTheDocument();
    expect(screen.getByText("Tierra")).toBeInTheDocument();
    expect(screen.getByText("Marte")).toBeInTheDocument();
    expect(screen.getByText("Júpiter")).toBeInTheDocument();
    expect(screen.getByText("Saturno")).toBeInTheDocument();
    expect(screen.getByText("Urano")).toBeInTheDocument();
    expect(screen.getByText("Neptuno")).toBeInTheDocument();
  });

  test("la función onClick se llama cuando un planeta es clickeado", () => {
    render(<SolarSystemScene />);

    // Simular clic en el planeta Mercurio
    fireEvent.click(screen.getByText("Mercurio"));

    // Verificar que la función onClick se ha llamado
    expect(window.alert).toHaveBeenCalledWith("Mercurio — planeta del Sistema Solar");
  });

  test("verifica si el sol está renderizado", () => {
    render(<SolarSystemScene />);

    // Verifica que el sol está presente en la escena
    const sun = screen.getByTestId("sun");
    expect(sun).toBeInTheDocument();
  });
});
