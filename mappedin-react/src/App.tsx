import React from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";

function MyCustomComponent() {
  const { mapData } = useMap();

  return mapData.getByType("space").map((space) => {
    return <Label target={space.center} text={space.name} />;
  });
}

export default function App() {
  // See Demo API key Terms and Conditions
  // https://developer.mappedin.com/v6/demo-keys-and-maps/
  const { isLoading, error, mapData } = useMapData({
    key: 'mik_jLcoTTRYFT3O05Su152e306f6',
    secret: 'mis_0rSTYuJi6ivxlsbRb8P157jwriG1xVU8IocaK0YldqI94881083',
    mapId: '66e50265af770b000b90802d'
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <MapView mapData={mapData}>
      <MyCustomComponent />
    </MapView>
  ) : null;
}
