import axios from "axios";

const PlayerService = {
  getAllPlayers: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/players/getallplayers`, {});
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Error fetching score cards");
    }
  },

  getAllRegisteredPlayers: async (competitionId) => {
    try {
      console.log(" in getAllRegisterdPlayers :", competitionId);
      console.log(" ${process.env.REACT_APP_API}in getAllRegisterdPlayers :", process.env.REACT_APP_API);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/competition/retrieveregisteredplayersforcompetition/${competitionId}`,
        {}
      );
      console.log(" response.data Players:", response.data);
      //console.log("Registered Players Type:", typeof registeredPlayers);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Error fetching score cards");
    }
  },

  registerPlayer: async (playerCompetition, selectedCompetition) => {
    // Make a POST request to register a player for a competition

    const updatedPlayerCompetition = {
      ...playerCompetition,
      competitionId: selectedCompetition.id,
      playerId: playerCompetition.id,
    };

    const url = `${process.env.REACT_APP_API}/competition/registerplayer`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayerCompetition),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register player.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error registering player:", error);
        throw error;
      });
  },
  searchCompetitions: async (criteria, searchText) => {
    // Make a GET request to search players based on the given criteria and searchText
    const url = `${process.env.REACT_APP_API}/competition/search?searchText=${searchText}&searchType=${criteria}`;
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error searching competitions:", error);
        throw error;
      });
  },
};

export default PlayerService;
