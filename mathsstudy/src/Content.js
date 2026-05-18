import { useState } from "react";
import { MathJax } from "better-react-mathjax";

export default function Content() {
  const latex = "\\frac{1}{2} + \\frac{3}{4}";
  const correctAnswer = "5/4"; // placeholder

  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  function checkAnswer() {
    const cleaned = answer.trim().replace(/\s+/g, "");
    setIsCorrect(cleaned === correctAnswer);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      checkAnswer();
    }
  }

  return (
    <div style={{ padding: "20px", fontSize: "20px", textAlign: "center" }}>
      {/* Question */}
      <MathJax>{"$$" + latex + "$$"}</MathJax>

      {/* Centred input */}
      <input
        type="text"
        maxLength={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="?"
        style={{
          marginTop: "16px",
          width: "100px",
          padding: "10px",
          fontSize: "20px",
          borderRadius: "6px",
          border: "2px solid",
          borderColor:
            isCorrect === null
              ? "#555"
              : isCorrect
              ? "#2ecc71" // green
              : "#e74c3c", // red
          backgroundColor: "#222",
          color: "white",
          textAlign: "center",
          outline: "none"
        }}
      />
    </div>
  );
}
