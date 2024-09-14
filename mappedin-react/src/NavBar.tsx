import { useMap } from "@mappedin/react-sdk";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useRoomStore } from "../stores/roomStore";
import data from '../data/data.json'


export default function NavBar() {
    return (
        <>
            <div className="fixed w-full top-0 bg-white p-4 text-slate-700 text-3xl shadow-lg tracking-tight font-bold">
                <p>LockedIn</p>
            </div>

            <div
                className="fixed top-3 right-4 flex items-center rounded text-xl z-50 bg-white space-x-3"
            >
                <FloorSelector />
                <RoomSelector />
            </div>
        </>
    );
}

function FloorSelector() {
    const { mapData, mapView } = useMap();
    const sortedFloors = mapData.getByType("floor").sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Select.Root
            defaultValue={mapView.currentFloor.id}
            onValueChange={(value) => mapView.setFloor(value)}
        >
            <Select.Trigger className="inline-flex items-center justify-between p-2 bg-gray-100 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <Select.Value />
                <Select.Icon className="ml-2">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport className="bg-white border border-gray-300 rounded shadow-lg">
                    {sortedFloors.map((floor, idx) => (
                        <Select.Item
                            key={idx}
                            value={floor.id}
                            className="relative select-none p-2 pl-8 pr-8 cursor-pointer rounded focus:bg-blue-500 focus:text-white"
                        >
                            <Select.ItemText>{floor.name}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                                <CheckIcon />
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
            </Select.Content>
        </Select.Root>
    );
}

function RoomSelector() {
    const { room, setRoom } = useRoomStore();
    console.log(room)
    return (

        <Select.Root
            value={room}
            onValueChange={(value) => {
                setRoom(value);
            }}
        >
            <Select.Trigger className="inline-flex items-center justify-between p-2 bg-gray-100 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <Select.Value />
                <Select.Icon className="ml-2">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Content>
                <Select.ScrollUpButton className="flex items-center justify-center text-gray-700">
                    <ChevronDownIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="bg-white border border-gray-300 rounded shadow-lg">
                    {data.rooms.map((room, idx) => (
                        <Select.Item
                            key={idx}
                            value={room.name}
                            className="relative select-none p-2 pl-8 pr-8 cursor-pointer rounded focus:bg-blue-500 focus:text-white"
                        >
                            <Select.ItemText>{room.name}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                                <CheckIcon />
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center text-gray-700">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Root>

    );
}
