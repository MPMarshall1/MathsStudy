import { useState, useEffect } from "react";

export default function Header({ mobileMenuOpen, setMobileMenuOpen, loggedIn, setLoggedIn, showLogin, setShowLogin }) {
  const [showAbout, setShowAbout] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    } else {
      setUserEmail("");
    }
  }, [loggedIn]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const hostname = window.location.hostname;
      const baseUrl = hostname === 'localhost' ? 'http://localhost:4000' : `https://${hostname}:4000`;
      const apiUrl = `${baseUrl}/api/auth`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("session", data.token);
      localStorage.setItem("userEmail", data.email);
      
      setUserEmail(data.email);
      setLoggedIn(true);
      setShowLogin(false);
      
      setEmail("");
      setPassword("");
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Could not connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("userEmail");
    setUserEmail("");
    setLoggedIn(false);
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

      {/* RIGHT SIDE: Email Display + Login/Logout Buttons */}
      <div className="header-right">
        {loggedIn && userEmail && (
          <span style={{ 
            marginRight: '12px', 
            fontSize: '14px', 
            color: '#47c9b3',
            fontWeight: 'bold'
          }}>
            {userEmail}
          </span>
        )}
        
        {loggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
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
            
            <h3 style={{marginTop: 0}}>Student Login</h3>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />

            <button
              className="about-btn"
              onClick={handleLogin}
              disabled={isLoading}
              style={{ 
                width: '100%', 
                marginTop: '10px',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>

            {error && (
              <p style={{ color: '#e74c3c', marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
                {error}
              </p>
            )}
            
            <p style={{fontSize: '12px', color: '#ccc', marginTop: '15px'}}>
              New users are automatically registered upon first login.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
