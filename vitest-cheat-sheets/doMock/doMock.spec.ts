import { expect, it, vi } from "vitest";
import { someFunction } from "./someModule";

it("original module", () => {
  const result = someFunction();

  expect(result).toEqual("original implementation");
});

it("doMock allows to use variables from scope", async () => {
  const dummyText = "dummy text";
  // vi.mock does not allow to use variables from the scope. It leads to errors like:
  // Error: [vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file.

  // vi.doMock does not get hoisted to the top instead of vi.mock
  vi.doMock("./someModule", () => {
    return {
      someFunction: vi.fn().mockReturnValue(dummyText),
    };
  });

  // dynamic import is required to get the mocked module with vi.docMock
  const { someFunction: someFunctionMock } = await import("./someModule");

  const result = someFunctionMock();

  expect(someFunctionMock).toHaveBeenCalled();
  expect(result).toEqual(dummyText);
});
