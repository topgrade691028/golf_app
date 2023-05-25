import React, { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [competitions, setCompetitions] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}/competitions/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText, searchType }),
      });
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.error("Error searching competitions:", error);
    }
  };

  return (
    <div>
      <h2>Search Competitions</h2>
      <div>
        <label>
          Search By:
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${searchType}`}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h3>Search Results</h3>
      {competitions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Competition Type</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.id}>
                <td>{competition.id}</td>
                <td>{competition.name}</td>
                <td>{competition.competitionType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No competitions found.</p>
      )}
    </div>
  );
};

export default Search;
