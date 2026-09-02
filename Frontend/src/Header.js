import { useState } from "react";

export default function Header({ mode, setMode, mobileMenuOpen, setMobileMenuOpen, loggedIn, setLoggedIn, showLogin, setShowLogin }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="header">

      {/* Desktop mode toggle */}
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

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(true)}
      >
        ☰
      </button>

      {/* Mobile sidebar drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar content will be injected from Sidebar.js */}
          </div>
        </div>
      )}

      {/* Right side buttons */}
      <div className="header-right">
        <button className="about-btn" onClick={() => setShowAbout(true)}>
          About
        </button>

        {loggedIn ? (
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("session");
            setLoggedIn(false);
          }}>
            Log out
          </button>
        ) : (
          <button className="logout-btn" onClick={() => setShowLogin(true)}>
            Log in
          </button>
        )}
      </div>

      {/* About modal */}
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

      {showLogin && (
        <div className="about-modal" onClick={() => setShowLogin(false)}>
          <div className="about-content" onClick={(e) => e.stopPropagation()}>
            <h2>Log In</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            <button
              className="about-btn"
              onClick={handleLogin}
            >
              Submit
            </button>

            {error && <p className="login-error">{error}</p>}
          </div>
        </div>
      )}
    </header>
  );
}