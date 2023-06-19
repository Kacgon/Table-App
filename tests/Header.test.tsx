import { render } from "@testing-library/react";
import HeaderComponent from "../src/components/Header";

describe("Header", () => {
  it("renders correctly header", async () => {
    const { container } = render(<HeaderComponent />);

    expect(container.firstChild).toHaveClass("MuiBox-root css-1uk7vpa");
  });
});
