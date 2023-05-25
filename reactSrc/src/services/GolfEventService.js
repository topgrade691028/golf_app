import axios from "axios";
import { apiUrl } from "../config";

const baseUrl = apiUrl;

const GolfEventService = {
  searchGolfEvents: async (searchText, searchType) => {
    const response = await axios.get(`${baseUrl}/events/search`, {
      params: {
        searchText,
        searchType,
      },
    });
    return response.data;
  },
  deleteGolfEvent: async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  },
};

export default GolfEventService;
