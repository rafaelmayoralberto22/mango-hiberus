import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RangeMode } from "../../helpers/constants";
import Range from "./Range";

describe("Range", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a Range mode Normal", async () => {
    render(
      <Range
        value={[3, 100]}
        mode={RangeMode.NORMAL}
        config={{ min: 3, max: 100 }}
        onChange={mockOnChange}
      />
    );

    const minText = await screen.findByTitle(/3,00 €/i);
    const maxText = await screen.findByTitle(/100,00 €/i);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders a Range mode Range", async () => {
    render(
      <Range
        value={[10, 40]}
        mode={RangeMode.RANGE}
        config={{ rangeValues: [10, 30, 40, 20] }}
        onChange={mockOnChange}
      />
    );

    const minText = await screen.findByTitle(/10,00 €/i);
    const maxText = await screen.findByTitle(/40,00 €/i);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
