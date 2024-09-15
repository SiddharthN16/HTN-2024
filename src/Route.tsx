import { Navigation, useMap } from "@mappedin/react-sdk";
import { useRoomStore } from "../stores/roomStore";
import { useFloorStore } from "../stores/floorStore";

const extractNumbers = (str: string): string => {
  return str.replace(/\D/g, "");
};

const startAnchors = [, "", "1026A", "2074", "3089", "4108", "5806", "6806"];

const Route = () => {
  const { mapData, mapView } = useMap();

  const { floor } = useFloorStore();

  const { room } = useRoomStore();

  const entranceNode = mapData
    .getByType("space")
    .find((space) => space.name === startAnchors[(floor as number) + 1]);

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
