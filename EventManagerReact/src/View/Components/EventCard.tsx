import React from "react";
import { EventCardProps } from "../EventCardProps";
import "../Styles/Events.css";



const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-content">
        {/* Title in bold */}
        <h3 className="event-title">{event.eventName}</h3>
        
        {/* Start to End Time */}
        <p className="time">
          {event.eventStart && event.eventEnd
            ? `${event.eventStart} - ${event.eventEnd}`
            : "TBD"}
        </p>
        
        {/* Category */}
        <p className="category">
          Kategori: {event.eventCategory || "Ukendt Kategori"}
        </p>
        
        {/* Location */}
        <p className="location">
          Lokation: {event.eventLocation || "Ikke angivet"}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
