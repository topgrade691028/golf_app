import axios from "axios";

const ScoreCardService = {
  getScoreCards: async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/scorecard/retrievescorecards`,
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
