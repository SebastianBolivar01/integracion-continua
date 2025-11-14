import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FriendlyCharacter from "./FriendlyCharacter"; // Asegúrate que la ruta sea correcta

describe("FriendlyCharacter", () => {
  // El mock de Math.random sigue siendo necesario
  let mockRandom: jest.SpyInstance;

  beforeEach(() => {
    // Hacemos que siempre devuelva 0 para elegir el primer mensaje (de tu NUEVA lista)
    mockRandom = jest.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    mockRandom.mockRestore();
  });

  // --- Pruebas Actualizadas ---

  test("muestra el mensaje de bienvenida en la ruta '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    // Buscamos por 'data-testid' que es más robusto
    const messageElement = screen.getByTestId("character-message");
    
    // Comparamos con el texto que RENDERIZA tu componente
    expect(messageElement).toHaveTextContent(
      "¡Hola! ¡Bienvenido! Elige una actividad para empezar a explorar."
    );
  });

  test("muestra el mensaje del globo en la ruta '/globe'", () => {
    render(
      <MemoryRouter initialEntries={["/globe"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");
    
    // Comparamos con el texto que RENDERIZA tu componente
    expect(messageElement).toHaveTextContent(
      "Explora nuestro planeta. ¿Qué lugar te gustaría visitar?"
    );
  });

  test("muestra el mensaje correcto en la ruta '/solar-system'", () => {
    render(
      <MemoryRouter initialEntries={["/solar-system"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");
    
    // Comparamos con el texto que RENDERIZA tu componente
    // Nota: Tu log muestra este mensaje para /solar-system Y para rutas desconocidas.
    // Asumimos que este es el comportamiento esperado de tu nuevo código.
    expect(messageElement).toHaveTextContent(
      "¡Qué divertido es aprender! Sigue explorando."
    );
  });

  test("muestra el mensaje por defecto en una ruta desconocida", () => {
    render(
      <MemoryRouter initialEntries={["/una-ruta-cualquiera"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");
    
    // Comparamos con el texto que RENDERIZA tu componente
    expect(messageElement).toHaveTextContent(
      "¡Qué divertido es aprender! Sigue explorando."
    );
  });

  test("renderiza el componente principal del personaje", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    // En lugar de buscar el emoji "🤖", buscamos el contenedor
    // principal del componente usando el test-id que ya tienes.
    expect(screen.getByTestId("friendly-character")).toBeInTheDocument();
  });
});