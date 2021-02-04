import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { HomeZone, Vehicle } from "./App";

interface Props {
  homeZones: HomeZone[];
  vehicles: Vehicle[];
}

function Map({ homeZones, vehicles }: Props) {
  useEffect(() => {
    // Mevo's Wellington office
    const { lng, lat, zoom } = {
      lng: 174.77545528266583,
      lat: -41.29011544430813,
      zoom: 13,
    };

    const map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });

    map.on("load", () => {
      // The first homeZone is the whole world for some reason
      homeZones.slice(1).forEach((zone: HomeZone, i: number) => {
        map.addSource(`id${i}`, {
          type: "geojson",
          data: {
            properties: {},
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [zone] as any, // TODO `any` is a code smell
            },
          },
        });

        map.addLayer({
          id: `id${i}`,
          type: "fill",
          source: `id${i}`,
          layout: {},
          paint: {
            "fill-color": "#f7590d",
            "fill-opacity": 0.2,
          },
        });
      });
    });

    vehicles.forEach(({ position: { longitude, latitude } }) =>
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map)
    );
  }, [homeZones, vehicles]);

  return <div id="mapbox" className="mapbox" />;
}

export default Map;
