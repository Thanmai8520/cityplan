import React, { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import "./App.css";


const App = () => {
  const globeRef = useRef();
  const [city, setCity] = useState(""); // Search input value
  const [cityData, setCityData] = useState(null); // Data for the selected city

  // Predefined list of cities with coordinates
  const cities = [
    {
      name: "New York",
      lat: 40.7128,
      lng: -74.0060,

      speciality: ["Dining", "Broadway Shows", "Street Food", "Museums"],
    },
    {
      name: "Paris",
      lat: 48.8566,
      lng: 2.3522,
     
      speciality: ["Cafes", "Museums", "Amusement Parks", "Fashion"],
    },
    {
      name: "Tokyo",
      lat: 35.6895,
      lng: 139.6917,
      
      speciality: ["Sushi", "Tech Hubs", "Temples", "Anime Culture"],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const selectedCity = cities.find(
      (c) => c.name.toLowerCase() === city.toLowerCase()
    );

    if (selectedCity) {
      // Update the globe's point of view
      globeRef.current.pointOfView(
        { lat: selectedCity.lat, lng: selectedCity.lng, altitude: 0.2 },
        1000
      );

      setCityData(selectedCity);
     
    } else {
      alert("City not found. Please try a different city.");
    }
  };

  useEffect(() => {
    const rotateGlobe = () => {
      if (globeRef.current && !cityData) {
        const { lat, lng, altitude } = globeRef.current.pointOfView();
        globeRef.current.pointOfView({
          lat,
          lng: (lng + 0.2) % 360,
          altitude,
        });
      }
    };

    const interval = setInterval(rotateGlobe, 50);

    return () => clearInterval(interval); // Cleanup
  }, [cityData]);

  return (
    <div className="App">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "300px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* 3D Globe */}
      <div className="globe-container">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          arcsData={
            cityData
              ? [
                  {
                    startLat: 0,
                    startLng: 0,
                    endLat: cityData.lat,
                    endLng: cityData.lng,
                  },
                ]
              : []
          }
          arcColor={() => "rgba(255, 0, 0, 0.75)"}
          arcDashLength={() => 0.5}
          arcDashGap={() => 0.01}
          arcDashAnimateTime={() => 2000}
          labelsData={cityData ? [cityData] : []}
          labelLat={(d) => d.lat}
          labelLng={(d) => d.lng}
          labelText={(d) => d.name}
          labelSize={() => 1}
          labelColor={() => "rgba(0, 255, 0, 0.9)"}
        />
      </div>

      {/* Templates for the City */}
      {cityData && (
        <div className="templates">
          <h2>Explore {cityData.name}</h2>
          <div className="template-cards">
            {cityData.speciality.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item}</h3>
                <p>Discover amazing {item.toLowerCase()} in {cityData.name}!</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
