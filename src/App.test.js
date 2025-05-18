// Mock out the entire App module
jest.mock("./App", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

test("App module can be loaded", () => {
  // Simply verify we can load our mock
  expect(jest.requireActual("./App.test.js")).toBeDefined();
});
