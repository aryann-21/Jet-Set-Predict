import React, { useState } from "react";
import "./App.css";
import FlightSearch from "./components/FlightSearch";
import Navbar from "./components/Navbar";
import flightsData from "./data/flightsData";

function App() {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (departureCity, arrivalCity, stops) => {
    const filtered = flightsData.filter(
      (flight) =>
        flight.from.toLowerCase() === departureCity.toLowerCase() &&
        flight.to.toLowerCase() === arrivalCity.toLowerCase() &&
        flight.stop === stops
    );

    setFilteredFlights(filtered);
    setSearched(true);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-4">
        {searched && filteredFlights.length === 0 ? (
          <p className="text-red-600 font-bold text-2xl text-center mt-36">
            Oops! No flights available for the selected criteria :)
          </p>
        ) : (
          <FlightSearch
            flights={filteredFlights.length > 0 ? filteredFlights : flightsData}
          />
        )}
      </div>
    </>
  );
}

export default App;