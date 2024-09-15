import { useEvent, useMap } from "@mappedin/react-sdk";
import { useRoomStore } from "../stores/roomStore";
import data from '../data/data.json';
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useState } from "react";


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
        const { labels, spaces } = event;
        console.log(event)
        if (labels.length >= 1) {
            setRoom("MC " + labels[0].text);
        }
    });

    const [isFavorite, setIsFavorite] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setLikes(likes + (isFavorite ? -1 : 1));
    };

    return (
        room && (
            <Tooltip.Provider>
                <div className="fixed left-2 top-20 max-w-full min-w-1/3 bg-white shadow-md p-5 z-50 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">{room}</h2>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold px-2 py-1 rounded-full">Accessible</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <AiFillStar className="text-yellow-500" />
                            <AiFillStar className="text-yellow-500" />
                            <AiFillStar className="text-yellow-500" />
                            <AiOutlineStar className="text-yellow-500" />
                            <AiOutlineStar className="text-yellow-500" />
                            <span className="text-sm text-gray-600">3.0</span>
                        </div>
                    </div>
                    {!selectedRoom?.dates && <p>No available today</p>}
                    {selectedRoom?.dates && (<> <p>Available times</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full">
                                    <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">Start</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm border-b border-gray-200">End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRoom?.dates.map((dateInfo, idx) => (
                                    <tr key={idx}>
                                        <td className="text-left py-3 px-4 border-b border-gray-200">{dateInfo.date}</td>
                                        <td className="text-left py-3 px-4 border-b border-gray-200">{dateInfo.start}</td>
                                        <td className="text-left py-3 px-4 border-b border-gray-200">{dateInfo.end}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <div className="flex items-center cursor-pointer" onClick={handleFavoriteClick}>
                                    {isFavorite ? <AiFillHeart className="text-red-500 text-2xl" /> : <AiOutlineHeart className="text-gray-500 text-2xl" />}
                                    <span className="text-sm text-gray-600 ml-2">{likes}</span>
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content side="top" align="center" className="bg-gray-800 text-white text-sm rounded px-2 py-1">
                                {isFavorite ? 'Unfavorite' : 'Favorite'}
                                <Tooltip.Arrow className="fill-gray-800" />
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </div>
                    </>)}
                </div>
            </Tooltip.Provider>
        )
    );
}

export default SpaceEvents;
