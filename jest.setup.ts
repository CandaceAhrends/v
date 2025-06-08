import "@testing-library/jest-dom";

// Mock import.meta
Object.defineProperty(globalThis, "import", {
  value: {
    meta: {
      env: {
        VITE_WS_URL: "ws://localhost:3005",
      },
    },
  },
});
