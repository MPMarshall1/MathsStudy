import { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import { getRandomQuestion, lessonLatex } from "./questions";

export default function Content({ activePage }) {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // Only randomise when switching TO the questions page
  useEffect(() => {
    if (activePage === "questions") {
      setQuestion(getRandomQuestion());
      setAnswer("");
      setIsCorrect(null);
    }
  }, [activePage]);

  function checkAnswer() {
    const cleaned = answer.trim().replace(/\s+/g, "");
    setIsCorrect(cleaned === question.answer);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") checkAnswer();
  }

  const latex = activePage === "lesson" ? lessonLatex : question.latex;

  return (
    <div className="content-inner">
      <MathJax dynamic>{latex}</MathJax>


      {activePage === "questions" && (
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
                ? "#2ecc71"
                : "#e74c3c",
            backgroundColor: "#222",
            color: "white",
            textAlign: "center",
            outline: "none"
          }}
        />
      )}
    </div>
  );
}
