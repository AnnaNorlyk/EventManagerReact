import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { EventData } from "../../Model/IEventData";

const MainSection: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load events when the component loads
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events/approved");
        if (!response.ok) {
          // If response is not ok
          throw new Error("Failed to fetch events");
        }

        // Store the events
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        // If something goes wrong, set an error message
        setError("Unable to load events");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="main-section">
      <h1 className="main-header">Begivenheder</h1>

      {/* If there is an error, show it */}
      {error && <div className="error-message">{error}</div>}

      {/* If still loading, show a loading message */}
      {isLoading && <div className="loading-message">Loading events...</div>}

      <div className="event-box">
        {!isLoading && events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))
        ) : (
          // If no events are found, show this message
          !isLoading && <p className="no-events-message">Ingen godkendte begivenheder fundet</p>
        )}
      </div>
    </div>
  );
};

export default MainSection;
