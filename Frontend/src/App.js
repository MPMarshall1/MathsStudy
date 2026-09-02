import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topic, setTopic] = useState("fractions");
  const [mode, setMode] = useState("lesson");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("session")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-container">
      <Header mode={mode} setMode={setMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} showLogin={showLogin} setShowLogin={setShowLogin}/>

      <Sidebar topic={topic} setTopic={setTopic} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <Content topic={topic} mode={mode} />
    </div>
  );
}
