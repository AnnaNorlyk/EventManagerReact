import React from "react";
import { EventCardProps } from "../EventCardProps";
import "../Styles/Events.css";



const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <img 
        src="https://via.placeholder.com/150" 
        alt={event.eventName || "Event"} 
        className="event-card-image"
      />
      <div className="event-card-content">
        <h3>{event.eventName}</h3>
        <p className="time">{`${event.eventStart || "TBD"} - ${event.eventEnd || "TBD"}`}</p>
        <p className="date">{new Date(event.eventStart || "").toLocaleDateString()}</p>
        <p className="location">{event.eventCategory || "Ukendt Kategori"}</p>
      </div>
    </div>
  );
};

export default EventCard;
