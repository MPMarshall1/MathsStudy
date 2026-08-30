import { useState } from "react";

export default function Header({ mode, setMode }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="header">
      <div className="header-toggle">
        <button
          className={mode === "questions" ? "active" : ""}
          onClick={() => setMode("questions")}
        >
          Questions
        </button>

        <button
          className={mode === "lesson" ? "active" : ""}
          onClick={() => setMode("lesson")}
        >
          Lesson
        </button>
      </div>

      <div className="header-right">
        <button className="about-btn" onClick={() => setShowAbout(true)}>
          About
        </button>

        <button className="logout-btn">Log out</button>
      </div>

      {showAbout && (
        <div className="about-modal" onClick={() => setShowAbout(false)}>
          <div
            className="about-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>About</h2>
            <p>Hello! My name is Michael and I am a student at the Univeristy of Edinburgh.</p>
            <br></br>
            <p>This webiste is just a little tool to help you study. Its motivated by the fact that there are only so many past papers but that most such questions can be procedurally generated.</p>
            <br></br>
            <p>You can reach me at s2662956@ed.ac.uk</p>
            <br></br>
            <p>Thank you to <a href="https://tardisproject.uk/">Tardis</a> for helping with hosting this website.</p>
          </div>
        </div>
      )}
    </header>
  );
}

