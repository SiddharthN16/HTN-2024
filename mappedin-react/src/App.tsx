import { MapView, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import FloorSelector from "./FloorSelector";
import { Labels } from "./Labels";
import SpaceEvents from "./SpaceEvents";


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
      <div className="fixed w-full top-0 bg-neutral-200 p-4 text-black text-3xl shadow-lg tracking-tight font-medium">
        <p>App Name</p>
      </div>
      <Labels />
      <FloorSelector />
      <SpaceEvents />
    </MapView>
  ) : null;
}
