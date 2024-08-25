import React from "react";

const FlightSearch = ({ flights }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-28 mb-6 text-white">
        Best Departing Flights
      </h1>
      <p className="text-gray-300 mb-16">
        Ranked based on price and convenience. Prices include required taxes +
        fees for 1 adult. Optional charges and bag fees may apply. Passenger
        assistance info.
      </p>
      <ul className="list-none space-y-6">
        {flights.map((flight, index) => (
          <li
            key={index}
            className="flex items-center border border-gray-700 bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="w-20 h-20 flex-shrink-0 mr-4">
              <img
                src={flight.img || 'default_image_url'} // Use a default image if none is provided
                alt={flight.airline}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-medium">{flight.airline}</p>
                <p className="text-xl font-semibold">{flight.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>
                  {flight.departureTime} - {flight.arrivalTime}
                </p>
                <p>{flight.duration}</p>
                <p className="text-green-600">
                  {flight.isNonstop}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;
