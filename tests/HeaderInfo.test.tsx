import { render, screen } from "@testing-library/react";
import HeaderInfo from "../src/components/HeaderInfo";

describe("HeaderInfo", () => {
  it("renders correctly HeaderInfo", async () => {
    const { container } = render(<HeaderInfo />);

    expect(container.firstChild).toHaveTextContent("Hi! Im Kacper");
  });
});
