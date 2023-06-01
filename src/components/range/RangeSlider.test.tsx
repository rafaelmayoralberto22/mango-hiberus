import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RangeSlider from "./RangeSlider";

describe("RangeSlider", () => {
  const mockOnChange = jest.fn();

  const minimumText = "The minimum selected is";
  const maximumText = "The maximum selected is";

  const testData = {
    max: 5,
    min: 1,
    points: [1, 2, 3, 4, 5],
    onChange: mockOnChange,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a RangeSlider extremes", async () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);
    const minText = await screen.findByTitle(`${minimumText} ${testData.min}`);
    const maxText = await screen.findByTitle(`${maximumText} ${testData.max}`);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("renders a RangeSlider extremes with mapLabel", async () => {
    const mapLabel = (item: number) => `${item} USD`;
    render(<RangeSlider {...testData} mapLabel={mapLabel} value={[1, 5]} />);

    const minText = await screen.findByTitle(
      `${minimumText} ${testData.min} USD`
    );
    const maxText = await screen.findByTitle(
      `${maximumText} ${testData.max} USD`
    );

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("execute onchange when moving a bullet 1", () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);

    const bullet1 = screen.getByTestId("bullet_1");

    fireEvent.mouseDown(bullet1);
    fireEvent.mouseMove(document, { clientX: 40 });
    fireEvent.mouseUp(bullet1);

    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it("execute onchange when moving a bullet 2", () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);

    const bullet2 = screen.getByTestId("bullet_2");

    fireEvent.mouseDown(bullet2);
    fireEvent.mouseMove(document, { clientX: -40 });
    fireEvent.mouseUp(bullet2);

    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it("run onchange when you press the arrow keys and the bullet 1 is in focus", async () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);

    const bullet1 = screen.getByTestId("bullet_1");

    bullet1.focus();
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard("[ArrowLeft]");
    await userEvent.keyboard("[ArrowRight]");

    expect(bullet1).toHaveFocus();
    expect(document.activeElement).toBe(bullet1);
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith([1, 5]);
    expect(mockOnChange).toHaveBeenCalledWith([2, 5]);
  });

  it("run onchange when you press the arrow keys and the bullet 2 is in focus", async () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);

    const bullet2 = screen.getByTestId("bullet_2");

    bullet2.focus();
    await userEvent.keyboard("[ArrowLeft]");
    await userEvent.keyboard("[ArrowLeft]");
    await userEvent.keyboard("[ArrowRight]");

    expect(bullet2).toHaveFocus();
    expect(document.activeElement).toBe(bullet2);
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith([1, 5]);
    expect(mockOnChange).toHaveBeenCalledWith([1, 4]);
    expect(mockOnChange).not.toHaveBeenCalledWith([1, 3]);
  });
});
