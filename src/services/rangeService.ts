import { ErrorCorruptedData } from "../errors/ErrorCorruptedData";
import { ErrorResponse } from "../errors/ErrorResponse";
import { URL_BACKEND } from "../helpers/constants";

export const getMinMax = async () => {
  try {
    const response = await fetch(`${URL_BACKEND}/min-max`);
    const data = await response.json();
    if (isNaN(data?.min) || isNaN(data?.max)) {
      throw new ErrorCorruptedData("Corrupted data");
    }
    return data;
  } catch (e) {
    if (e instanceof ErrorCorruptedData) throw e;

    throw new ErrorResponse("Error response");
  }
};

export const getMinMaxRange = async () => {
  try {
    const response = await fetch(`${URL_BACKEND}/min-max-range`);
    const data = await response.json();
    if (data?.range?.some?.((it: number) => isNaN(it))) {
      throw new ErrorCorruptedData("Corrupted data");
    }
    return data;
  } catch (e) {
    if (e instanceof ErrorCorruptedData) throw e;

    throw new ErrorResponse("Error response");
  }
};
