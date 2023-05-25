// ScoreCardService.js

import axios from "axios";
import { apiUrl } from "../config";

const ScoreCardService = {
  getScoreCards: async (
    searchCriteria,
    searchText,
    groupingId,
    groupingTitle
  ) => {
    try {
      const params = {
        eventId: null,
        groupingId: null,
        groupingTitle: null,
      };

      // Map search criteria to the corresponding query parameter
      if (searchCriteria === "eventId") {
        params.eventId = searchText;
      } else if (searchCriteria === "groupName") {
        params.groupingId = searchText;
      } else if (searchCriteria === "groupingTitle") {
        params.groupingTitle = searchText;
      }

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
