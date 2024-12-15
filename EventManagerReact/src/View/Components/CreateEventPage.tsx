import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateEventPage.css";

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "Andet",
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
      // Retrieve the logged-in user from session storage
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
      if (!loggedInUser?.userId) {
        alert("You must be logged in to create an event.");
        return;
      }
  
      // Send the event creation request
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: loggedInUser.userId }),
      });
  
      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to create event.");
        return;
      }
  
      // If succesful, show a message and navigate
      const contentType = response.headers.get("Content-Type");
      const data = contentType?.includes("application/json") ? await response.json() : {};
      alert(data.message || "Event created successfully.");
      navigate("/");
      
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("An error occurred. Please try again.");
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
