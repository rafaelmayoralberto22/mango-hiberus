import { URL_BACKEND } from "../helpers/constants";

export const getMinMax = async () => {
  try {
    const response = await fetch(`${URL_BACKEND}/min-max`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getMinMaxRange = async () => {
  try {
    const response = await fetch(`${URL_BACKEND}/min-max-range`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
