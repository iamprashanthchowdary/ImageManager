import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { siteConfig } from "@/config/site";

describe("Home", () => {
  it("renders the value-prop headline as the primary heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the site name in the header", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: siteConfig.name })).toBeInTheDocument();
  });
});
