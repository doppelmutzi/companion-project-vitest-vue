import { ref } from "vue";
import { useTitleSimple } from "./useTitle";
import useTitle from "./useTitle";
import { describe, it, expect } from "vitest";

describe("useTitle composable", {}, () => {
  it("should update document title when observe is true", () => {
    const newTitle = ref("New Title");
    useTitleSimple(newTitle);

    expect(document.title).toBe(newTitle.value);
  });

  it("should update document title when observe is true", () => {
    const newTitle = ref("New Title");
    const { setTitle } = useTitle(newTitle, { observe: true });

    expect(document.title).toBe(newTitle.value);
    // newTitle.value = "Another Title";
    setTitle("Another Title");
    expect(document.title).toBe("Another Title");
  });
});
