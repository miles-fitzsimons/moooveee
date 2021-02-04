import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getData } from "./getData";
import Error from "./Error";

interface Position {
  longitude: number;
  latitude: number;
}

export interface Vehicle {
  position: Position;
}

export interface HomeZone {
  longLat: number[];
}

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [homeZones, setHomeZones] = useState<HomeZone[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData("vehicles", (data: Vehicle[]) => data, setError).then((data) =>
      setVehicles((data as unknown) as Vehicle[])
    );
  }, []);

  useEffect(() => {
    getData(
      "home-zones",
      ({ data }: { data: { geometry: { coordinates: HomeZone[] } } }) =>
        data.geometry.coordinates,
      setError
    ).then((data) => setHomeZones((data as unknown) as HomeZone[]));
  }, []);

  return (
    <div className="app-container">
      {(!homeZones || !vehicles) && <LinearProgress className="loader" />}
      <h1 className="header">Moooveee</h1>
      {error ? (
        <Error />
      ) : (
        homeZones &&
        vehicles && <Map homeZones={homeZones} vehicles={vehicles} />
      )}
    </div>
  );
}

export default App;
