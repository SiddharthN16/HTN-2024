import { useEvent, useMap } from "@mappedin/react-sdk";
import { useState } from "react";

function SpaceEvents() {
    const { mapView, mapData } = useMap();
    const [selectedSpace, setSelectedSpace] = useState("");

    mapData.getByType("space").forEach((space) => {
        mapView.updateState(space, {
			interactive: true,
            hoverColor: 'lightblue',
		});
    });

    useEvent("click", (event) => {
        const { labels, spaces } = event;
        console.log(event)
        if (labels.length >= 1) {
            setSelectedSpace(labels[0].text);
        }
    });

    return (
        selectedSpace &&
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-5 z-50 rounded">
            <h2 className="text-xl font-bold mb-2">{selectedSpace}</h2>
        </div>
    );
}

export default SpaceEvents;