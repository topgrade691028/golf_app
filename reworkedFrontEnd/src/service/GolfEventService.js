import axios from "axios";

const GolfEventService = {
  searchGolfEvents: async (searchText, searchType) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/events/search`, {
      params: {
        searchText,
        searchType,
      },
    });
    return response.data;
  },
  deleteGolfEvent: async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/events/${id}`);
    return response.data;
  },
  getPlayerGroupsForEvent: async (eventId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/events/getplayergroups/${eventId}`
    );
    return response.data;
  },
  getAllEventsForCompetition: async (competitionId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/events/competition/${competitionId}`
    );
    return response.data;
  },
};

export default GolfEventService;
