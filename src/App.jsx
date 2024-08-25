import React, { useState } from "react";
import "./App.css";
import FlightSearch from "./components/FlightSearch";
import Navbar from "./components/Navbar";

function App() {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (departureCity, arrivalCity, stops, departureDate) => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Source: encodeCity(departureCity),
          Destination: encodeCity(arrivalCity),
          Total_Stops: stops,
          Day: getDayIndex(departureDate),
          Month: new Date(departureDate).getMonth() + 1
        }),
      });

      const data = await response.json();

      setFilteredFlights([{
        airline: 'Predicted Airline',
        price: data.predicted_price,
        departureTime: 'N/A',
        arrivalTime: 'N/A',
        duration: `${data.predicted_duration_hours} hours ${data.predicted_duration_minutes} minutes`,
        isNonstop: stops === 0 ? 'Nonstop' : `${stops} stops`
      }]);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  // Dummy functions for encoding city and getting day index; replace with actual logic
  const encodeCity = (city) => {
    const cityMap = { 'Banglore': 0, 'New Delhi': 1, 'Delhi': 2, 'Cochin': 3, 'Kolkata': 4 };
    return cityMap[city] || -1;
  };

  const getDayIndex = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
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
            flights={filteredFlights.length > 0 ? filteredFlights : []}
          />
        )}
      </div>
    </>
  );
}

export default App;
