import { render } from "@testing-library/react";
import { ProductDetailsComponent } from "../src/components/ProductDetails";
import React from "react";

describe("ProductDetailsComponent", () => {
  it("renders correctly ProductDetailsComponent", async () => {
    const { container } = render(
      <ProductDetailsComponent productInfo={null} />
    );

    expect(container.firstChild).toBeVisible;
  });
});
