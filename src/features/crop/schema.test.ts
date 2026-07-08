import { describe, expect, it } from "vitest";
import { customAspectRatioSchema } from "./schema";

describe("customAspectRatioSchema", () => {
  it("accepts a valid ratio and coerces numeric strings", () => {
    const result = customAspectRatioSchema.safeParse({ label: "Banner", width: "12", height: "5" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ label: "Banner", width: 12, height: 5 });
    }
  });

  it("rejects an empty name", () => {
    const result = customAspectRatioSchema.safeParse({ label: "  ", width: 4, height: 3 });
    expect(result.success).toBe(false);
  });

  it("rejects a non-positive width or height", () => {
    expect(customAspectRatioSchema.safeParse({ label: "Bad", width: 0, height: 3 }).success).toBe(
      false,
    );
    expect(customAspectRatioSchema.safeParse({ label: "Bad", width: 4, height: -1 }).success).toBe(
      false,
    );
  });

  it("rejects a non-integer width or height", () => {
    const result = customAspectRatioSchema.safeParse({ label: "Bad", width: 4.5, height: 3 });
    expect(result.success).toBe(false);
  });
});
