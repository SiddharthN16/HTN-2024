import React, { useState } from "react";
import data from '../data/data.json'

export default function RoomSelector() {

    // Initalize state. Do I need to init with default here?
    const [room, setRoom] = useState("");

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
                    // const room = data.rooms.find((r) => r.name === roomName) // triple = vs double = ?
                    setRoom(e.target.value);
                }}
            >
            {data.rooms.map((room, idx) => (
                <option key={idx} value={room.name}>
                {room.name}
                </option>
            ))}
            </select>
        </div>
    )
}