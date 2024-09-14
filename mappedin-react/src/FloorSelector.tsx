import { useMap } from "@mappedin/react-sdk";

export default function FloorSelector() {
  const { mapData, mapView } = useMap();

  const sortedFloors = mapData.getByType("floor").sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
        <div className="fixed w-full top-0 bg-white p-4 text-slate-700 text-3xl shadow-lg tracking-tight font-medium">
            <p>LockedIn</p>
        </div>
        <div
        style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
        className="text-xl p-10"
        >
        <select
            defaultValue={mapView.currentFloor.id}
            onChange={(e) => {
            mapView.setFloor(e.target.value);
            }}
            className="rounded"
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
    </> 
  );
}
