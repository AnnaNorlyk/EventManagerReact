import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  // Holds the user's email and password as they type
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Updates the state whenever the user types in the email or password fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Copies the old formData and replaces either email or password with the new value
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  // Handles submit click
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from refreshing

    try {
      // Send a POST request with the email and password
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Alert for error
      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Login failed. Please try again.");
        return;
      }

      // Success message
      const result = await response.json();
      console.log("Login successful:", result);

      // Store logged-in user information in SessionStorage
      sessionStorage.setItem("loggedInUser", JSON.stringify(result));

      // Alert success and navigate back to the main page
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      // Alert for error
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <h1>Log Ind</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Kodeord"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Log In
        </button>
      </form>

      {/* Return button */}
      <button className="tilbage-button" onClick={() => navigate("/")}>
        Tilbage
      </button>
    </div>
  );
}

export default LoginPage;
