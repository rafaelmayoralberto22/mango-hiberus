import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Test", () => {
  it("renders a Home Component", () => {
    const title = "Mango - Hiberus Test";
    render(<Home {...{ title }} />);

    const heading = screen.getByRole("heading", {
      name: title,
    });

    const navigation = screen.getByRole("navigation");
    const listNavigation = navigation.getElementsByTagName("li");

    expect(heading).toBeInTheDocument();
    expect(listNavigation).toHaveLength(2);
  });
});
