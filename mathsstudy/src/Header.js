export default function Header({ mode, setMode }) {
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

      <button className="logout-btn">Log out</button>
    </header>
  );
}

