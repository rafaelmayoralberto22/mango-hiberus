import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RangeSlider from "./RangeSlider";

describe("RangeSlider", () => {
  const mockOnChange = jest.fn();

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
    const minText = await screen.findByTitle(testData.min);
    const maxText = await screen.findByTitle(testData.max);

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("renders a RangeSlider extremes with mapLabel", async () => {
    const mapLabel = (item: number) => `${item} USD`;
    render(<RangeSlider {...testData} mapLabel={mapLabel} value={[1, 5]} />);

    const minText = await screen.findByTitle(`${testData.min} USD`);
    const maxText = await screen.findByTitle(`${testData.max} USD`);

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
    await userEvent.keyboard("[ArrowRight][ArrowRight][ArrowLeft][ArrowLeft]");

    expect(bullet1).toHaveFocus();
    expect(document.activeElement).toBe(bullet1);
    expect(mockOnChange).toHaveBeenCalledTimes(5);
  });

  it("run onchange when you press the arrow keys and the bullet 2 is in focus", async () => {
    render(<RangeSlider {...testData} value={[1, 5]} />);

    const bullet2 = screen.getByTestId("bullet_2");

    bullet2.focus();
    await userEvent.keyboard("[ArrowRight][ArrowRight][ArrowRight][ArrowLeft]");

    expect(bullet2).toHaveFocus();
    expect(document.activeElement).toBe(bullet2);
    expect(mockOnChange).toHaveBeenCalledTimes(5);
  });
});
