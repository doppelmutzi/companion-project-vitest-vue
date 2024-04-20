// show cases test API usage (extract), see https://vitest.dev/api/

// explicit import of APIs
import {
  describe,
  it,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
// or configure it in vitest.config.ts and activate globals
// https://vitest.dev/config/#globals

// describe groups test into test suite
describe("organizing tests", () => {
  beforeAll(() => {
    // runs once before first test
  });

  afterAll(() => {
    // runs once after all last test
  });

  beforeEach(() => {
    // runs before each test
  });

  beforeEach(() => {
    // runs after each test
  });

  // prototype tests
  test.todo("todo: implement test");

  test("should ...", () => {
    expect(true).toBe(true);
  });

  // alias for test
  it.todo("todo: implement test");

  // pass expect to test function
  it("should ...", ({ expect }) => {
    expect(false).toBe(false);
  });

  // async test
  it("should fetch...", async () => {
    // await ...
  });

  // ignore this test
  it.skip("should...", () => {
    expect(true).toBe(false);
  });

  // parameterized tests
  const i = [1, 2, 3];
  test.each(i)("should ...", (value) => {
    expect(value).toBeTypeOf("number");
  });

  // nest test suites
  describe("nested suite", () => {
    it.todo("should...");
  });

  // run with $ SKIP_TESTS=true npm t
  const shouldSkipTests = process.env.SKIP_TESTS === "true";

  describe.skipIf(shouldSkipTests)(
    "tests that should be skipped based on env variable",
    () => {
      it("should run without set env variable", () => {
        expect(true).toBe(true);
      });

      // runs only this tests in whole test file
      //   it.only("should...", () => {
      //     expect(true).toBe(true);
      //   });
    },
  );

  const runCondition = !!process.env.SKIP_TESTS;

  describe.runIf(runCondition)(
    "tests that should be run based on env variables",
    () => {
      it("should ...", () => {});
    },
  );

  describe("concurrent suite", () => {
    test.concurrent("... should run in parallel with other test", async () => {
      expect(false).toBe(false);
    });
    test.concurrent("... should run in parallel with other test", async () => {
      expect(true).toBe(true);
    });
  });
});
