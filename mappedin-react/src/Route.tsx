import { Navigation, useMap } from "@mappedin/react-sdk";
import { useRoomStore } from "../stores/roomStore";

const extractNumbers = (str: string): string => {
  return str.replace(/\D/g, "");
};

const Route = () => {
  const { mapData, mapView } = useMap();

  const { room } = useRoomStore();

  console.log(room);

  const entranceNode = mapData
    .getByType("space")
    .find((space) => space.name === "10264");

  const openClassNode = mapData
    .getByType("space")
    .find((space) => space.name === extractNumbers(room));

  const directions =
    entranceNode && openClassNode
      ? mapView.getDirections(entranceNode, openClassNode)
      : null;
  return directions ? <Navigation directions={directions} /> : null;
};

export default Route;
