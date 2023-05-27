import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RangeInput from "./RangeInput";

describe("Range", () => {
  const mockOnChange = jest.fn();

  it("renders a Range Input only label", async () => {
    render(
      <RangeInput label="3,00 €" value={2} onChange={mockOnChange} onlyLabel />
    );

    const buttonText = await screen.findByRole("button");
    const text = await screen.findByText(/3,00 €/i);
    fireEvent.click(buttonText);

    expect(buttonText).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders a Range Input", async () => {
    render(<RangeInput label="3,00 €" value={2} onChange={mockOnChange} />);

    const buttonText = await screen.findByRole("button");
    fireEvent.click(buttonText);

    expect(buttonText).not.toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });
});
