// ScoreCardService.js

import axios from "axios";
import { apiUrl } from "../config";

const ScoreCardService = {
  getScoreCards: async (params) => {
    try {
      const response = await axios.get(
        `${apiUrl}/scorecard/retrievescorecards`,
        {
          params: params,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching score cards");
    }
  },
};

export default ScoreCardService;
