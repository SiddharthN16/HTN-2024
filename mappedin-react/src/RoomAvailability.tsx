import data from "../data/data.json";
import { useRoomStore } from "../stores/roomStore";
import { days } from "./constants";

export default function RoomSelector() {
  const { setRoom } = useRoomStore();

  let availableRooms: any[] = [];

  for (let i = 0; i < data.rooms.length; i++) {
    const room = data.rooms[i];
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const currentRooms: any[] = room.dates;

    for (let j = 0; j < currentRooms.length; j++) {
      const date = new Date();
      const currDay = days[date.getDay()];

      //   if (currDay !== currentRooms[j].date) {
      //     continue;
      //   }

      if (currDay !== "Saturday") {
        continue;
      }

      const [startHours, startMinutes] = currentRooms[j].start
        .split(":")
        .map(Number);
      if (
        startHours < currentHours ||
        (startHours === currentHours && startMinutes < currentMinutes)
      ) {
        const [endHours, endMinutes] = currentRooms[j].end
          .split(":")
          .map(Number);
        if (
          endHours > currentHours ||
          (endHours === currentHours && endMinutes > currentMinutes)
        ) {
          availableRooms.push(room);
          break;
        }
      }
    }
  }

  if (availableRooms.length === 0) {
    return;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      }}
      className="text-xl p-10"
    >
      <select
        defaultValue={data.rooms[0]["name"]}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      >
        {availableRooms.map((room, idx) => (
          <option key={idx} value={room.name}>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
}
