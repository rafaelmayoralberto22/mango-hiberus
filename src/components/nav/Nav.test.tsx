import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

describe("Nav Test", () => {
  it("renders a Nav", () => {
    render(<Nav />);

    const navigation = screen.getByRole("navigation");
    const listNavigation = navigation.getElementsByTagName("li");

    expect(listNavigation).toHaveLength(3);
  });
});
