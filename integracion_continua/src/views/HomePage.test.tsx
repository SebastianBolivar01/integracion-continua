import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Este archivo contiene pruebas para el componente HomePage.
// La página principal muestra el título de bienvenida, subtítulo descriptivo
// y botones para acceder a las diferentes actividades educativas.

describe("HomePage", () => {
  // Prueba que verifica que el título principal se renderiza correctamente
  it("renders the main title", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("¡Bienvenido a la Aventura Educativa!")).toBeInTheDocument();
  });

  // Prueba que verifica que el subtítulo se renderiza correctamente
  it("renders the subtitle", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Explora el mundo de las matemáticas, las ciencias sociales y las ciencias naturales de forma divertida y interactiva.")).toBeInTheDocument();
  });

  // Prueba que verifica que todos los botones de actividades se renderizan
  it("renders all activity buttons", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Explorador de Formas")).toBeInTheDocument();
    expect(screen.getByText("Globo Interactivo")).toBeInTheDocument();
    expect(screen.getByText("Pintura 3D")).toBeInTheDocument();
    expect(screen.getByText("Sistema Solar")).toBeInTheDocument();
  });
});