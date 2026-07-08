import { describe, expect, it } from "vitest";
import {
  addCustomRatio,
  EMPTY_STORE_STATE,
  hideBuiltIn,
  removeCustomRatio,
  restoreAllBuiltIns,
  restoreBuiltIn,
  visibleBuiltIns,
} from "./aspect-ratio-store";
import { BUILT_IN_ASPECT_RATIOS } from "./aspect-ratios";

describe("aspect-ratio-store", () => {
  it("shows every built-in ratio by default", () => {
    expect(visibleBuiltIns(EMPTY_STORE_STATE)).toHaveLength(BUILT_IN_ASPECT_RATIOS.length);
  });

  it("hides a built-in ratio without mutating the original list", () => {
    const state = hideBuiltIn(EMPTY_STORE_STATE, "square");
    expect(visibleBuiltIns(state).map((r) => r.id)).not.toContain("square");
    expect(BUILT_IN_ASPECT_RATIOS.map((r) => r.id)).toContain("square");
  });

  it("hiding the same built-in twice is a no-op", () => {
    const once = hideBuiltIn(EMPTY_STORE_STATE, "square");
    const twice = hideBuiltIn(once, "square");
    expect(twice.deletedBuiltInIds).toEqual(["square"]);
  });

  it("restores a single hidden built-in", () => {
    const hidden = hideBuiltIn(EMPTY_STORE_STATE, "square");
    const restored = restoreBuiltIn(hidden, "square");
    expect(visibleBuiltIns(restored).map((r) => r.id)).toContain("square");
  });

  it("restores every hidden built-in at once", () => {
    const hidden = hideBuiltIn(hideBuiltIn(EMPTY_STORE_STATE, "square"), "story");
    const restored = restoreAllBuiltIns(hidden);
    expect(restored.deletedBuiltInIds).toEqual([]);
    expect(visibleBuiltIns(restored)).toHaveLength(BUILT_IN_ASPECT_RATIOS.length);
  });

  it("adds and removes a custom ratio", () => {
    const customRatio = { id: "abc", label: "My ratio", ratioLabel: "5:7", ratio: 5 / 7 };
    const added = addCustomRatio(EMPTY_STORE_STATE, customRatio);
    expect(added.customRatios).toEqual([customRatio]);

    const removed = removeCustomRatio(added, "abc");
    expect(removed.customRatios).toEqual([]);
  });
});
