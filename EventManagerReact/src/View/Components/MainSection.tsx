import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { EventData } from "../../Model/IEventData";

const MainSection: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");

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

  const searchFunction = (allEvents: EventData[], term: string): EventData[] => {
    return allEvents.filter((event) =>
      (event.eventName ?? "").toLowerCase().includes(term.toLowerCase())
    );
  };

  const sortFunction = (allEvents: EventData[], criterion: string): EventData[] => {
    const sorted = [...allEvents]; 

    switch (criterion) {
      case "name":
        sorted.sort((a, b) => (a.eventName ?? "").localeCompare(b.eventName ?? ""));
        break;
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(a.eventStart ?? "").getTime() - new Date(b.eventStart ?? "").getTime()
        );
        break;
      case "category":
        sorted.sort((a, b) =>
          (a.eventCategory ?? "").localeCompare(b.eventCategory ?? "")
        );
        break;
      default:
        break;
    }

    return sorted;
  };

  const filteredEvents = searchFunction(events, searchTerm);
  const finalEvents = sortFunction(filteredEvents, sortTerm);

  return (
    <div className="main-section">
      <h1 className="main-header">Begivenheder</h1>

      <div className="search-sort-bar">
        {/* Sort Dropdown */}
        <select
          className="sort-dropdown"
          value={sortTerm}
          onChange={(e) => setSortTerm(e.target.value)}
        >
          <option value="">Sortér efter</option>
          <option value="name">Navn</option>
          <option value="date">Dato</option>
          <option value="category">Kategori</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Søg efter begivenhed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* If still loading, show a loading message */}
      {isLoading && <div className="loading-message">Loading events...</div>}

      <div className="event-box">
        {!isLoading && finalEvents.length > 0 ? (
          finalEvents.map((event) => <EventCard key={event.eventId} event={event} />)
        ) : (
          !isLoading && <p className="no-events-message">Ingen godkendte begivenheder fundet</p>
        )}
      </div>
    </div>
  );
};

export default MainSection;
