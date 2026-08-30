import { useState } from "react";

export default function Header({ mode, setMode, mobileMenuOpen, setMobileMenuOpen }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="header">

      {/* Toggle */}
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

      <button
        className="hamburger-btn"
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Right side buttons */}
      <div className="header-right">
        <button className="about-btn" onClick={() => setShowAbout(true)}>
          About
        </button>

        <button className="logout-btn">Log out</button>

        {showAbout && (
          <div className="about-modal" onClick={() => setShowAbout(false)}>
            <div className="about-content" onClick={(e) => e.stopPropagation()}>
              <h2>About</h2>
              <p>Hello! My name is Michael and I am a student at the University of Edinburgh.</p>
              <br />
              <p>This website is a little tool to help you study. It’s motivated by the fact that there are only so many past papers but most such questions can be procedurally generated.</p>
              <br />
              <p>You can reach me at s2662956@ed.ac.uk</p>
              <br />
              <p>Thank you to <a href="https://tardisproject.uk/">Tardis</a> for helping with hosting this website.</p>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}