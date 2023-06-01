import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RangeInput from "./RangeInput";

describe("Range", () => {
  const mockOnChange = jest.fn();
  const title = "the title is 3,00 €";

  it("renders a Range Input only label", async () => {
    render(
      <RangeInput
        label="3,00 €"
        title={title}
        value={2}
        onChange={mockOnChange}
        onlyLabel
      />
    );

    const buttonText = await screen.findByTitle(title);
    const text = await screen.findByText(/3,00 €/i);
    fireEvent.click(buttonText);

    expect(buttonText).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders a Range Input", async () => {
    render(
      <RangeInput
        label="3,00 €"
        title={title}
        value={2}
        onChange={mockOnChange}
      />
    );

    const buttonText = await screen.findByTitle(title);
    fireEvent.click(buttonText);

    expect(buttonText).not.toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });
});
