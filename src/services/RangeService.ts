import { URL_BACKEND } from "../helpers/constants";

class RangeService {
  static async getMinMax() {
    try {
      const response = await fetch(`${URL_BACKEND}/min-max`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  static async getMinMaxRange() {
    try {
      const response = await fetch(`${URL_BACKEND}/min-max-range`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

export default RangeService;
