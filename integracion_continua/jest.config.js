export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  
  // --- CAMBIOS AQUÍ ---
  // Ejecuta ESTE archivo ANTES de todo.
  setupFiles: ["<rootDir>/src/jest.setup.ts"],
  
  // Mantenemos esto para jest-dom y otros mocks.
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // --- FIN DE CAMBIOS ---

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};