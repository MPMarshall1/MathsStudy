import { useState } from "react";

export default function Header({ mobileMenuOpen, setMobileMenuOpen, loggedIn, setLoggedIn, showLogin, setShowLogin }) {
  const [showAbout, setShowAbout] = useState(false);
  
  // State for Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple mock login logic
    if (email && password) {
      localStorage.setItem("session", "active");
      setLoggedIn(true);
      setShowLogin(false);
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <header className="header">

      {/* LEFT SIDE: Contains the About Button */}
      <div className="header-toggle" style={{ alignItems: 'center' }}>
        <button className="about-btn" onClick={() => setShowAbout(true)}>
          About
        </button>
      </div>

      {/* Mobile hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* 
         NOTE: The mobile sidebar overlay and content are now rendered 
         inside Sidebar.js to handle the "click-away-to-close" logic cleanly.
         We removed the duplicate drawer code from here.
      */}

      {/* RIGHT SIDE: Login/Logout Buttons */}
      <div className="header-right">
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

      {/* About Modal */}
      {showAbout && (
        <div className="about-modal" onClick={() => setShowAbout(false)}>
          <div className="about-content" onClick={(e) => e.stopPropagation()}>
            <h2>About</h2>
            <p>Hello! My name is Michael and I am a student at the University of Edinburgh.</p>
            <br />
            <p>This website is a little tool to help you study. It's motivated by the fact that there are only so many past papers but most such questions can be procedurally generated.</p>
            <br />
            <p>You can reach me at s2662956@ed.ac.uk</p>
            <br />
            <p>Thank you to <a href="https://tardisproject.uk/">Tardis</a> for helping with hosting this website.</p>
          </div>
        </div>
      )}

      {/* Login Modal */}
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
              style={{ width: '100%', marginTop: '10px' }}
            >
              Submit
            </button>

            {error && (
              <p style={{ color: '#e74c3c', marginTop: '10px', fontSize: '14px' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
