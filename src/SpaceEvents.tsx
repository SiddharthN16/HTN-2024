import { useEvent, useMap } from "@mappedin/react-sdk";
import { useRoomStore } from "../stores/roomStore";
import data from "../data/data.json";

function SpaceEvents() {
  const { mapView, mapData } = useMap();
  const { room, setRoom } = useRoomStore();

  const getRoomByName = (name: String) => {
    return data.rooms.find((room) => room.name === name);
  };
  const selectedRoom = getRoomByName(room);

  mapData.getByType("space").forEach((space) => {
    mapView.updateState(space, {
      interactive: true,
      hoverColor: "lightblue",
    });
  });

  useEvent("click", (event) => {
    const { labels } = event;
    console.log(event);
    if (labels.length >= 1) {
      setRoom("MC " + labels[0].text);
    }
  });

  return (
    room && (
      <div className="fixed left-2 top-20 max-w-full bg-white shadow-md p-5 z-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{room}</h2>
        {selectedRoom?.dates ? (
          <p>Available times</p>
        ) : (
          <p>No available times</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full">
                <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">
                  Start
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">
                  End
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedRoom?.dates.map((dateInfo, idx) => (
                <tr key={idx}>
                  <td className="text-left py-3 px-4 border-b border-gray-200">
                    {dateInfo.date}
                  </td>
                  <td className="text-left py-3 px-4 border-b border-gray-200">
                    {dateInfo.start}
                  </td>
                  <td className="text-left py-3 px-4 border-b border-gray-200">
                    {dateInfo.end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default SpaceEvents;
