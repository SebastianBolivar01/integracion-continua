// Este archivo extiende el entorno de prueba de Jest.

import "@testing-library/jest-dom";
// Las líneas de TextEncoder y TextDecoder se movieron a jest.setup.ts

// Polyfill para ResizeObserver requerido por @react-three/fiber
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({ 
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    classList: {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  writable: true,
});

Object.defineProperty(document, "dispatchEvent", {
  value: jest.fn(),
});