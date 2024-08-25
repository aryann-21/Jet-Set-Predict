import React, { useState } from "react";
import logo from "../assets/airplane.svg";

function Navbar({ onSearch }) {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [stops, setStops] = useState(0); // Ensure default value is set

  const handleDepartureCityChange = (event) =>
    setDepartureCity(event.target.value);
  const handleArrivalCityChange = (event) => setArrivalCity(event.target.value);
  const handleStopsChange = (event) => setStops(Number(event.target.value));
  const handleDepartureDateChange = (event) =>
    setDepartureDate(event.target.value);

  const swapPlaces = () => {
    setArrivalCity(departureCity);
    setDepartureCity(arrivalCity);
  };

  const handleSearch = () => {
    onSearch(departureCity, arrivalCity, stops, departureDate);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-700 shadow-lg py-3 px-3">
      <div className="container mx-auto px-4 py-4">
        <div className="search-bar flex flex-col md:flex-row justify-between items-center">
          <div className=" flex items-center font-bold text-3xl">
            Jet-Set-Predict
            <img className="ml-3 w-14" src={logo} />
          </div>
          <div className="left flex flex-col sm:flex-row items-center gap-2 relative mb-2 md:mb-0">
            <input
              type="text"
              value={departureCity}
              onChange={handleDepartureCityChange}
              placeholder="From-"
              className="w-full sm:w-1/2 px-3 py-2 text-gray-200 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              className="swapBtn absolute flex justify-center items-center ml-[200px] h-8 w-8 bg-gray-800 border border-gray-500 rounded-3xl cursor-pointer hover:bg-gray-700"
              onClick={swapPlaces}
            >
              <i className="fas fa-exchange-alt text-sm" />
            </button>
            <input
              type="text"
              value={arrivalCity}
              onChange={handleArrivalCityChange}
              placeholder="To-"
              className="w-full sm:w-1/2 pl-6 pr-3 py-2 text-gray-200 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              value={stops}
              onChange={handleStopsChange}
              placeholder="No. of Stops"
              className="w-full sm:w-1/2 pl-6 pr-3 py-2 text-gray-200 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mid flex flex-col sm:flex-row items-center gap-2 mb-2 md:mb-0 w-80">
            <input
              type="date"
              value={departureDate}
              onChange={handleDepartureDateChange}
              placeholder="On-"
              className="w-full sm:w-1/2 px-3 py-2 text-gray-200 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md shadow-md w-full md:w-auto"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
