import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Viewmodel/userService";
import { UserData } from "../../Model/IUserData";
import "../Styles/OpretPage.css";

const OpretPage: React.FC = () => {
  const navigate = useNavigate();

  // Manage form inputs
  const [formData, setFormData] = useState<UserData>({
    Firstname: "",
    Lastname: "",
    UserEmail: "",
    UserPassword: "",
  });

  // Show/hide the success modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update form data when a user types in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to create a new user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from refreshing
    try {
      await createUser(formData); // Send form data to the API
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong");
    }
  };

  // Close the modal and go back to the home page
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="opret-page-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit} className="opret-form">

        {/* Input fields for the form */}
        <input
          type="text"
          name="Firstname"
          placeholder="Fornavn"
          value={formData.Firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Lastname"
          placeholder="Efternavn"
          value={formData.Lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="UserEmail"
          placeholder="Email"
          value={formData.UserEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="UserPassword"
          placeholder="Kodeord"
          value={formData.UserPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Registrér</button>
      </form>

      <button className="tilbage-button" onClick={() => navigate("/")}>
        Tilbage
      </button>

      {/* Show modal if the user is successfully created */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Bruger oprettet.</h2>
            <p>Bruger blev oprettet successfuldt.</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpretPage;
