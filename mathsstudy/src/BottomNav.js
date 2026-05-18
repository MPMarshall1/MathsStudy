import { useState } from "react";

export default function BottomNav() {
  const [active, setActive] = useState("lesson");

  return (
    <nav className="bottomnav">
      <button
        className={active === "questions" ? "active" : ""}
        onClick={() => setActive("questions")}
      >
        Questions
      </button>

      <button
        className={active === "lesson" ? "active" : ""}
        onClick={() => setActive("lesson")}
      >
        Lesson
      </button>
    </nav>
  );
}

