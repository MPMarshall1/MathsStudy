// Header.js
export default function Header({ activePage, setActivePage }) {
  return (
    <header className="header">
      <div className="header-toggle">
        <button
          className={activePage === "questions" ? "active" : ""}
          onClick={() => setActivePage("questions")}
        >
          Questions
        </button>

        <button
          className={activePage === "lesson" ? "active" : ""}
          onClick={() => setActivePage("lesson")}
        >
          Lesson
        </button>
      </div>

      <button className="logout-btn">Log out</button>
    </header>
  );
}

