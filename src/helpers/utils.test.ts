import "@testing-library/jest-dom";
import {
  calculatePixelFromValue,
  generateRangeNumber,
  getCurrentValuePixel,
  getPosValue,
  getValuePixelLeft,
  getValuePixelRight,
  mapLabelEuro,
  sortRangeNumbers,
} from "./utils";

describe("Utils Test", () => {
  const strictItemsBullets = [
    { x: 0, y: 40, valueL: 1, valueR: 5 },
    { x: 40, y: 80, valueL: 2, valueR: 4 },
    { x: 80, y: 120, valueL: 3, valueR: 3 },
    { x: 120, y: 160, valueL: 4, valueR: 2 },
    { x: 160, y: 200, valueL: 5, valueR: 1 },
  ];

  it("test generateRangeNumber", () => {
    const items = generateRangeNumber(1, 5);

    expect(items).not.toBeNull();
    expect(items).not.toBeUndefined();
    expect(items).toHaveLength(5);
    expect(items).toMatchObject([1, 2, 3, 4, 5]);
    expect(items).not.toMatchObject([2, 3, 4, 5, 7]);
  });

  it("test sortRangeNumbers", () => {
    const strictSortItems = [1, 8, 20, 45, 56, 67];
    const items = sortRangeNumbers([20, 1, 45, 67, 56, 8]);

    expect(strictSortItems).toStrictEqual(items);
  });

  it("test mapLabelEuro", () => {
    const mapLabel = mapLabelEuro(56);

    expect(mapLabel).toContain("€");
    expect(mapLabel).toContain("56,00");
  });

  it("test getCurrentValuePixel", () => {
    const items = getCurrentValuePixel([1, 2, 3, 4, 5], 200);

    expect(strictItemsBullets).toStrictEqual(items);
  });

  it("test getValuePixelLeft", () => {
    const items1 = getValuePixelLeft(10, strictItemsBullets);
    const items4 = getValuePixelLeft(122, strictItemsBullets);
    const itemsNot = getValuePixelLeft(500, strictItemsBullets);

    expect(items1).toEqual(1);
    expect(items4).toEqual(4);
    expect(itemsNot).toEqual(0);
  });

  it("test getValuePixelRight", () => {
    const items5 = getValuePixelRight(10, strictItemsBullets);
    const items2 = getValuePixelRight(122, strictItemsBullets);
    const itemsNot = getValuePixelRight(500, strictItemsBullets);

    expect(items5).toEqual(5);
    expect(items2).toEqual(2);
    expect(itemsNot).toEqual(0);
  });

  it("test calculatePixelFromValue", () => {
    const coordinates = calculatePixelFromValue(
      1,
      5,
      [0, 0],
      strictItemsBullets
    );

    const coordinates2 = calculatePixelFromValue(
      2,
      3,
      [0, 0],
      strictItemsBullets
    );

    expect(coordinates).toStrictEqual([0, 0]);
    expect(coordinates2).toStrictEqual([40, 80]);
  });

  it("test getPosValue", () => {
    const pos = getPosValue("LEFT", 1, strictItemsBullets);
    const pos2 = getPosValue("LEFT", 7, strictItemsBullets);

    expect(pos).toEqual(0);
    expect(pos2).toEqual(-1);
  });
});
