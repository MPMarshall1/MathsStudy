import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";

export default function App() {
  const [topic, setTopic] = useState("fractions");
  const [mode, setMode] = useState("lesson");

  return (
    <div className="app-container">
      <Header mode={mode} setMode={setMode} />

      <Sidebar topic={topic} setTopic={setTopic} />

      <Content topic={topic} mode={mode} />
    </div>
  );
}
