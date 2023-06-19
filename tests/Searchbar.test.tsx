import { screen, render, fireEvent } from "@testing-library/react";
import { SearchBarComponent } from "../src/components/SearchBar";

describe("Searchbar", () => {
  it("renders correctly Searchbar", async () => {
    render(
      <SearchBarComponent
        onChangeOfSearchBar={function (event: {
          target: { value: any };
        }): void {}}
        handleSearchProductIcon={function (): void {}}
      />
    );

    expect(screen.getByPlaceholderText("search")).toBeTruthy();
  });

  it("checks if value passed changes input value", () => {
    render(
      <SearchBarComponent
        onChangeOfSearchBar={function (event: {
          target: { value: any };
        }): void {}}
        handleSearchProductIcon={function (): void {}}
      />
    );
    const input = screen.getByPlaceholderText("search");

    fireEvent.change(input, { target: { value: "passed phrase" } });
    expect(input.value).toBe("passed phrase");
  });
});
