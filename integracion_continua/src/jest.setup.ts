// Este archivo se ejecuta ANTES de que el entorno de Jest (jsdom) se configure.

import { TextEncoder, TextDecoder } from "util";

// Asigna las implementaciones de Node al objeto global
// para que estén disponibles en el entorno de jsdom.
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;