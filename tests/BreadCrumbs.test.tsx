import { render, screen } from "@testing-library/react";
import BreadCrumbsComponent from "../src/components/BreadCrumbs";

describe("Breadcrumbs", () => {
  it("renders Breadcrumbs", async () => {
    render(
      <BreadCrumbsComponent
        elements={["Products"]}
        handleBreadCrumbClick={function (message: string): void {}}
      />
    );

    expect(screen.getByText(`Products`)).toBeInTheDocument();
  });
});
