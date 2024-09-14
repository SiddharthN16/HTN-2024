import { useEvent, useMap } from "@mappedin/react-sdk";
import { useState } from "react";

function SpaceEvents() {
  const { mapView, mapData } = useMap();
  const [selectedSpace, setSelectedSpace] = useState("");

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
      setSelectedSpace(labels[0].text);
    }
  });

  return (
    selectedSpace && (
      <div className="fixed left-2 top-12 transform -translate-y-1/2 mt-20 mb-5 max-w-15 bg-white shadow-md p-5 z-50 rounded-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">{selectedSpace}</h2>
        <div className="space-y-2"></div>
      </div>
    )
  );
}

export default SpaceEvents;
