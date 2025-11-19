import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FriendlyCharacter from "./FriendlyCharacter"; // Asegúrate que la ruta sea correcta

// Este archivo contiene pruebas para el componente FriendlyCharacter.
// El componente muestra mensajes diferentes según la ruta actual de la aplicación.
// Utilizamos mocks para simular el comportamiento de Math.random y el enrutamiento.

describe("FriendlyCharacter", () => {
  // El mock de Math.random sigue siendo necesario para controlar la aleatoriedad en los mensajes
  let mockRandom: jest.SpyInstance;

  beforeEach(() => {
    // Configuramos Math.random para que siempre devuelva 0, asegurando que se elija el primer mensaje de la lista
    mockRandom = jest.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    // Restauramos el comportamiento original de Math.random después de cada prueba
    mockRandom.mockRestore();
  });

  // --- Pruebas Actualizadas ---

  // Prueba que verifica que el mensaje de bienvenida se muestra correctamente cuando estamos en la ruta principal '/'
  test("muestra el mensaje de bienvenida en la ruta '/'", () => {
    // Renderizamos el componente dentro de un MemoryRouter con la ruta inicial '/'
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    // Buscamos el elemento del mensaje usando 'data-testid', que es más robusto que buscar por texto
    const messageElement = screen.getByTestId("character-message");

    // Verificamos que el contenido del mensaje sea exactamente el esperado para la ruta principal
    expect(messageElement).toHaveTextContent(
      "¡Hola! ¡Bienvenido! Elige una actividad para empezar a explorar."
    );
  });

  // Prueba que verifica el mensaje específico para la ruta del globo terráqueo '/globe'
  test("muestra el mensaje del globo en la ruta '/globe'", () => {
    // Renderizamos con la ruta '/globe' para probar el mensaje específico del globo terráqueo
    render(
      <MemoryRouter initialEntries={["/globe"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");

    // Verificamos que el mensaje sea el correcto para la exploración del planeta
    expect(messageElement).toHaveTextContent(
      "Explora nuestro planeta. ¿Qué lugar te gustaría visitar?"
    );
  });

  // Prueba que verifica el mensaje para la ruta del sistema solar '/solar-system'
  test("muestra el mensaje correcto en la ruta '/solar-system'", () => {
    // Probamos la ruta '/solar-system' que debería mostrar un mensaje de aprendizaje
    render(
      <MemoryRouter initialEntries={["/solar-system"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");

    // Verificamos el mensaje de diversión en el aprendizaje
    // Nota: Este mensaje también se usa para rutas desconocidas según el comportamiento actual
    expect(messageElement).toHaveTextContent(
      "¡Qué divertido es aprender! Sigue explorando."
    );
  });

  // Prueba que verifica el mensaje por defecto cuando se accede a una ruta no reconocida
  test("muestra el mensaje por defecto en una ruta desconocida", () => {
    // Usamos una ruta arbitraria para probar el caso por defecto
    render(
      <MemoryRouter initialEntries={["/una-ruta-cualquiera"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    const messageElement = screen.getByTestId("character-message");

    // El mensaje por defecto debería ser el mismo que para rutas no específicas
    expect(messageElement).toHaveTextContent(
      "¡Qué divertido es aprender! Sigue explorando."
    );
  });

  // Prueba que verifica que el componente principal del personaje se renderiza correctamente
  test("renderiza el componente principal del personaje", () => {
    // Renderizamos el componente para verificar que se monta correctamente
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FriendlyCharacter />
      </MemoryRouter>
    );

    // Verificamos la presencia del contenedor principal usando su data-testid
    // Esto asegura que el componente se renderiza sin errores
    expect(screen.getByTestId("friendly-character")).toBeInTheDocument();
  });
});