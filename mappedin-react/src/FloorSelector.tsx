import { useMap } from "@mappedin/react-sdk";

export default function FloorSelector() {
  const { mapData, mapView } = useMap();

  const sortedFloors = mapData.getByType("floor").sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      }}
      className="text-3xl p-10"
    >
      <select
        defaultValue={mapView.currentFloor.id}
        onChange={(e) => {
          mapView.setFloor(e.target.value);
        }}
      >
        {sortedFloors.map((floor, idx) => {
          return (
            <option key={idx} value={floor.id}>
              {floor.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
