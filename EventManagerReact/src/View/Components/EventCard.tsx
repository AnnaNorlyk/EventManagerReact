import React from "react";
import { EventCardProps } from "../EventCardProps";
import "../Styles/Events.css";


const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const startDate = event.eventStart ? new Date(event.eventStart) : null;
  const endDate = event.eventEnd ? new Date(event.eventEnd) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return (
    <div className="event-card">
      <div className="event-card-content">
        <h3 className="event-title">{event.eventName}</h3>

        {startDate && endDate ? (
          <>
            <p className="details">
              <strong>Dato:</strong> {startDate.toLocaleDateString("da-DK", dateOptions)} - {endDate.toLocaleDateString("da-DK", dateOptions)}
            </p>
            <p className="details">
              <strong>Tid:</strong> {startDate.toLocaleTimeString("da-DK", timeOptions)} - {endDate.toLocaleTimeString("da-DK", timeOptions)}
            </p>
          </>
        ) : (
          <p className="details">
            <strong>Dato:</strong> TBD
          </p>
        )}

        <p className="details">
          <strong>Kategori:</strong> {event.eventCategory || "Andet"}
        </p>

        <p className="details">
          <strong>Lokation:</strong> {event.eventLocation || "Ikke angivet"}
        </p>
      </div>
    </div>
  );
};


export default EventCard;
