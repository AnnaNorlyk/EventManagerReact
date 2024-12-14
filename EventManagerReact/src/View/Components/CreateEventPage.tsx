import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateEventPage.css";

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "Other",
    eventDescription: "",
    eventStart: "",
    eventEnd: "",
    eventLocation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

      if (!loggedInUser) {
        alert("You must be logged in to create an event.");
        return;
      }

      const response = await fetch("/api/events/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId: loggedInUser.userId }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to create event. Please try again.");
        return;
      }

      alert("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  return (
    <div className="create-event-page">
      <h1>Opret Begivenhed</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <input
          type="text"
          name="eventName"
          placeholder="Begivenhed Navn"
          value={formData.eventName}
          onChange={handleChange}
          required
        />

        {/* Event Category */}
        <select
          name="eventCategory"
          value={formData.eventCategory}
          onChange={handleChange}
          required
        >
          <option value="Andet">Andet</option>
          <option value="Sport">Sport</option>
          <option value="Musik">Musik</option>
          <option value="Læring">Læring</option>
          <option value="Marked">Marked</option>
        </select>

        <textarea
          name="eventDescription"
          placeholder="Beskrivelse"
          value={formData.eventDescription}
          onChange={handleChange}
        />

        {/* Event Start */}
        <input
          type="datetime-local"
          name="eventStart"
          value={formData.eventStart}
          onChange={handleChange}
          required
        />

        {/* Event End */}
        <input
          type="datetime-local"
          name="eventEnd"
          value={formData.eventEnd}
          onChange={handleChange}
          required
        />

        {/* Event Location */}
        <input
          type="text"
          name="eventLocation"
          placeholder="Addresse"
          value={formData.eventLocation}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Create Event
        </button>

        {/* Tilbage Button */}
        {
        <button
          type="button"
          className="tilbage-button"
          onClick={() => navigate("/")}
        >
          Tilbage
        </button>
        }
      </form>
    </div>
  );
};

export default CreateEventPage;
