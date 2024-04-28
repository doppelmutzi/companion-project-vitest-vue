import { afterEach, describe, expect, it, vi } from "vitest";
// Import the test candidate / SUT
import { calculate } from "./calculate";
// import the module to substitute (used inside of SUT)
import { logger } from "./logger";

// setup the actor "logger", mock the log function to prevent actual log output
// mocking is one variant of test doubles
vi.mock("./logger");

// create test suite explicitly with describe
describe("calculate function", () => {
  afterEach(() => {
    // Setup phase: Clear all mocks before each test to ensure a clean slate
    vi.clearAllMocks();
  });

  // create test part of test suite with it (alias for test)
  it("should perform correct calculation and log the result of the calculation", () => {
    // Arrange: Set up the test candidate and the actors
    const num1 = 5;
    const num2 = 10;
    const expectedResult = 15;

    // gain access to the mock to assert on it later
    const loggerMock = vi.mocked(logger);

    // Act: Call the SUT with the arranged parameters
    const result = calculate(num1, num2);

    // Assert: Check that the SUT behaved as expected
    // perform state verification
    expect(result).toBe(expectedResult);
    // perform behavior verification
    expect(loggerMock.log).toHaveBeenCalledWith(
      `The result is ${expectedResult}`,
    );
  });
});
