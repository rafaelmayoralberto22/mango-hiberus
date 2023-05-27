import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RangeFixed from "./RangeFixed";

describe("RangeFixed", () => {
  const mockOnChange = jest.fn();

  const testData = {
    rangeValues: [1, 2, 3, 4],
    onChange: mockOnChange,
  };

  it("renders a RangeFixed", async () => {
    render(<RangeFixed {...testData} value={[1, 4]} />);

    const bullet1 = screen.getByTestId("bullet_1");

    const minText = await screen.findByTitle(/1,00 €/i);
    const maxText = await screen.findByTitle(/4,00 €/i);

    fireEvent.mouseDown(bullet1);
    fireEvent.mouseMove(document, { clientX: 40 });
    fireEvent.mouseUp(bullet1);

    expect(mockOnChange).toHaveBeenCalledTimes(2);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();

    expect(bullet1).not.toHaveFocus();
  });
});
