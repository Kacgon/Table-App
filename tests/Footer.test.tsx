import { render } from "@testing-library/react";
import FooterComponent from "../src/components/Footer";

describe("Footer", () => {
  it("renders footer", async () => {
    const { container } = render(<FooterComponent />);

    expect(container.firstChild).toHaveClass("MuiBox-root css-kclpii");
  });
});
