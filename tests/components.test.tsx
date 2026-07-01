import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

describe("CVA and UI Primitives rendering checks", () => {
  it("renders a Badge component with correct text and default variant styling", () => {
    render(<Badge>Beta Shield</Badge>);
    const element = screen.getByText("Beta Shield");
    expect(element).toBeInTheDocument();
    expect(element.className).toContain("rounded-full");
    expect(element.className).toContain("font-mono");
  });

  it("renders a Card component with custom children", () => {
    render(
      <Card>
        <div data-testid="card-child">Nested Content</div>
      </Card>
    );
    const element = screen.getByTestId("card-child");
    expect(element).toBeInTheDocument();
  });

  it("renders an Input component with correct attributes", () => {
    render(<Input placeholder="Verify connection" type="password" />);
    const element = screen.getByPlaceholderText("Verify connection");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("type", "password");
  });
});
