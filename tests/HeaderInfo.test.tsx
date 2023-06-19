import { render, screen } from "@testing-library/react";
import HeaderInfoComponent from "../src/components/HeaderInfo";

describe("HeaderInfo", () => {
  it("renders correctly HeaderInfo", async () => {
    const { container } = render(<HeaderInfoComponent />);

    expect(container.firstChild).toHaveTextContent("Hi! Im Kacper");
  });
});
