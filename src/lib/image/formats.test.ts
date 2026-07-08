import { describe, expect, it } from "vitest";
import { IMAGE_FORMAT_CANDIDATES } from "./formats";

describe("IMAGE_FORMAT_CANDIDATES", () => {
  it("has a unique id, mime type, and extension per format", () => {
    const ids = IMAGE_FORMAT_CANDIDATES.map((f) => f.id);
    const mimeTypes = IMAGE_FORMAT_CANDIDATES.map((f) => f.mimeType);
    const extensions = IMAGE_FORMAT_CANDIDATES.map((f) => f.extension);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(mimeTypes).size).toBe(mimeTypes.length);
    expect(new Set(extensions).size).toBe(extensions.length);
  });

  it("only PNG lacks quality control (lossless)", () => {
    const withoutQuality = IMAGE_FORMAT_CANDIDATES.filter((f) => !f.supportsQuality).map(
      (f) => f.id,
    );
    expect(withoutQuality).toEqual(["png"]);
  });

  it("only JPEG lacks transparency support", () => {
    const withoutTransparency = IMAGE_FORMAT_CANDIDATES.filter((f) => !f.supportsTransparency).map(
      (f) => f.id,
    );
    expect(withoutTransparency).toEqual(["jpeg"]);
  });
});
