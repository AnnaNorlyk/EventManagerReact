import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button">Favoritter</button>
      </div>
      <div className="header-right">
        <button className="header-button" onClick={() => navigate("/opret")}>
          Opret
        </button>
        <button className="header-button" onClick={() => navigate("/login")}>
          Log Ind
        </button>
      </div>
    </header>
  );
};

export default Header;
