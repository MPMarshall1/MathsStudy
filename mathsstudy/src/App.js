// App.js
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("lesson");

  return (
    <div className="app-container">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <Sidebar />
      <Content activePage={activePage} />
    </div>
  );
}

export default App;
