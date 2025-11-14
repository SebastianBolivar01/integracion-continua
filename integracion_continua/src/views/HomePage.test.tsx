import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the main title", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("¡Bienvenido a la Aventura Educativa!")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Explora el mundo de las matemáticas, las ciencias sociales y las ciencias naturales de forma divertida y interactiva.")).toBeInTheDocument();
  });

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