import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check if a user is logged in using sessionStorage
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button">Favoritter</button>
      </div>
      <div className="header-right">
        {/* Conditionally render "Opret Begivenhed" button */}
        {loggedInUser && (
          <button
            className="header-button"
            onClick={() => navigate("/create-event")}
          >
            Opret Begivenhed
          </button>
        )}
        
        {/* Opret Button */}
          <button
          className="header-button"
          onClick={() => navigate("/opret")} 
        >
          Opret bruger
        </button>


        {/* Log Ind button */}
        {!loggedInUser && (
          <button className="header-button" onClick={() => navigate("/login")}>
            Log Ind
          </button>
        )}

        {/* Log Ud button */}
        {loggedInUser && (
          <button
            className="header-button"
            onClick={() => {
              sessionStorage.removeItem("loggedInUser");
              alert("Du er blevet logget ud.");
              navigate("/");
            }}
          >
            Log Ud
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
