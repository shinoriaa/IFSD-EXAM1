import React, { useState } from 'react';

const RouteWidget = () => {
  const [routes, setRoutes] = useState([]);
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  const handleSourceCityChange = (e) => {
    setSourceCity(e.target.value);
  };

  const handleDestinationCityChange = (e) => {
    setDestinationCity(e.target.value);
  };

  const handleCreateRoute = () => {
    if (sourceCity && destinationCity) {
      const newRoute = {
        sourceCity,
        destinationCity,
      };

      setRoutes([...routes, newRoute]);
      setSourceCity('');
      setDestinationCity('');
    }
  };

  const handleUpdateRoute = (index) => {
    const updatedRoutes = [...routes];
    updatedRoutes[index] = {
      sourceCity,
      destinationCity,
    };

    setRoutes(updatedRoutes);
    setSourceCity('');
    setDestinationCity('');
  };

  const handleDeleteRoute = (index) => {
    const updatedRoutes = [...routes];
    updatedRoutes.splice(index, 1);

    setRoutes(updatedRoutes);
  };

  return (
    <div>
      <h2>Route Widget</h2>
      <div>
        <label>Source City:</label>
        <input type="text" value={sourceCity} onChange={handleSourceCityChange} />
      </div>
      <div>
        <label>Destination City:</label>
        <input type="text" value={destinationCity} onChange={handleDestinationCityChange} />
      </div>
      <button onClick={handleCreateRoute}>Create Route</button>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <span>Source: {route.sourceCity}</span>
            <span>Destination: {route.destinationCity}</span>
            <button onClick={() => handleUpdateRoute(index)}>Update</button>
            <button onClick={() => handleDeleteRoute(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteWidget;
