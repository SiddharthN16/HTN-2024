import { useEvent, useMap } from "@mappedin/react-sdk";
import { useState } from "react";
import { useRoomStore } from "../stores/roomStore";
import data from '../data/data.json'


function SpaceEvents() {
    const { mapView, mapData } = useMap();
    const { room, setRoom } = useRoomStore();

    const getRoomByName = (name : String) => {
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
        const { labels, spaces } = event;
        console.log(event)
        if (labels.length >= 1) {
            setRoom("MC " + labels[0].text);
        }
    });

    return (
        room && (
            <div className="fixed left-2 top-20 max-w-15 bg-white shadow-md p-5 z-50 rounded-lg flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">{room}</h2>
                <div className="space-y-2">
                    <h2>{room}</h2>
                    <ul>
                        {selectedRoom?.dates.map((dateInfo, idx) => (
                            <li key={idx}>
                                {dateInfo.date}: Start - {dateInfo.start}, End - {dateInfo.end}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    );
}

export default SpaceEvents;
