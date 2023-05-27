import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RangeNormal from "./RangeNormal";

describe("RangeNormal", () => {
  const mockOnChange = jest.fn();

  const testData = {
    max: 7,
    min: 1,
    onChange: mockOnChange,
  };

  it("renders a RangeNormal", async () => {
    render(<RangeNormal {...testData} value={[1, 7]} />);

    const bullet1 = screen.getByTestId("bullet_1");

    const minText = await screen.findByTitle(/1,00 €/i);
    const maxText = await screen.findByTitle(/7,00 €/i);

    fireEvent.mouseDown(bullet1);
    fireEvent.mouseMove(document, { clientX: 40 });
    fireEvent.mouseUp(bullet1);

    expect(mockOnChange).toHaveBeenCalledTimes(2);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();

    expect(bullet1).not.toHaveFocus();
  });
});
