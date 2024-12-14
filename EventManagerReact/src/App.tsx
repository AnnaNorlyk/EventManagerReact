import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./View/Components/HeaderComponent";
import MainSection from "./View/Components/MainSection";
import LoginPage from "./View/Components/LoginPage";
import OpretPage from "./View/Components/OpretPage";
import CreateEventPage from "./View/Components/CreateEventPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/opret" element={<OpretPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
