import React from "react";
import data from '../data/data.json'

export default function RoomAvailability(){
    return (
        <div>
          <h1>Classroom Availability</h1>
    
          {/* Loop through the rooms array */}
          {data.rooms.map((room, index) => (
            <div key={index}>
              {/* Name of each room */}
              <h2>{room.name}</h2>
    
              {/* Availability dates for each room */}
              <ul>
                {room.dates.map((dateInfo, idx) => (
                  <li key={idx}>
                    {dateInfo.date}: {dateInfo.start} - {dateInfo.end}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
}