import { expect, test, vi } from "vitest";
import Bike from "./default-class";
import { Car } from "./named-class";

test("mock a method of a default import class", () => {
  vi.mock("./default-class", () => {
    const MyClass = vi.fn();
    MyClass.prototype.ride = vi.fn();
    return { default: MyClass };
  });

  const myMethodMock = vi.mocked(Bike.prototype.ride);
  myMethodMock
    .mockReturnValueOnce("mocked value")
    .mockReturnValueOnce("another mocked value");

  const myInstance = new Bike();
  let result = myInstance.ride();
  expect(result).toBe("mocked value");

  result = Bike.prototype.ride();
  expect(result).toBe("another mocked value");
  expect(myMethodMock).toHaveBeenCalledTimes(2);
});

test("mock a method of a named export class", () => {
  vi.mock("./named-class", () => {
    const MyClass = vi.fn();
    MyClass.prototype.drive = vi.fn();
    return { Car: MyClass };
  });

  const myMethodMock = vi.mocked(Car.prototype.drive);
  myMethodMock
    .mockReturnValueOnce("mocked value")
    .mockReturnValueOnce("another mocked value");

  const myInstance = new Car();
  let result = myInstance.drive();
  expect(result).toBe("mocked value");

  result = Car.prototype.drive();
  expect(result).toBe("another mocked value");
  expect(myMethodMock).toHaveBeenCalledTimes(2);
});
