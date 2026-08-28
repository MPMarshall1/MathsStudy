import React, { useState, useEffect, useMemo } from "react";
import { MathJax } from "better-react-mathjax";

import * as Fractions from "./pages/fractionsMultiply";
import * as RationalDenominator from "./pages/rationalDenominator";
import * as RootsNature from "./pages/rootsNature";
import * as LineFromDiagram from "./pages/lineFromDiagram";
import * as VolumeOfSphere from "./pages/volumeOfSphere";
import * as EvaluateFunction from "./pages/evaluateFunction";
import * as ReverseFunction from "./pages/reverseFunction";

export default function Content({ topic, mode }) {
  const topicModule =
    topic === "fractions"
      ? Fractions
      : topic === "rationalDenominator"
      ? RationalDenominator
      : topic === "rootsNature"
      ? RootsNature
      : topic === "linesFromDiagram"
      ? LineFromDiagram
      : topic === "volumeOfSphere"
      ? VolumeOfSphere
      : topic === "evaluateFunction"
      ? EvaluateFunction
      : topic === "reverseFunction"
      ? ReverseFunction

      : LineFromDiagram;

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    async function loadQuestion() {
      const q = await topicModule.getRandomQuestion();
      setQuestion(q);
      setAnswer("");
      setIsCorrect(null);
    }
    loadQuestion();
  }, [topic]);

  const latex = mode === "lesson" ? topicModule.lessonLatex : question?.latex;
  const renderedLatex = useMemo(() => latex, [latex]);

  if (!question) return <div>Loading…</div>;

  function handleKeyDown(e) {
    if (e.key === "Enter") checkAnswer();
  }

  function checkAnswer() {
    const correct = answer.trim() === question.answer.toString();
    setIsCorrect(correct);
  }

  return (
    <div className="content-inner">
      {mode === "lesson" && (
        <MathJax dynamic>{renderedLatex}</MathJax>
      )}

      {mode === "questions" && (
        <>
          <div className="show-answer-box">
            <span className="default-text">Show Answer</span>
            <span className="answer-text">{question.answer}</span>
          </div>

          {question.diagram && (
            <div
              className="diagram"
              dangerouslySetInnerHTML={{ __html: question.diagram }}
            />
          )}

          <p style={{ fontSize: "22px", marginBottom: "10px" }}>
            {question.instruction}
          </p>

          <MathJax dynamic>{renderedLatex}</MathJax>

          <p style={{ fontSize: "12px", marginBottom: "10px" }}>
            {question.postamble}
          </p>

          <input
            type="text"
            maxLength={100}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="?"
            className={`answer-input ${
              isCorrect === null
                ? "neutral"
                : isCorrect
                ? "correct"
                : "incorrect"
            }`}
          />
        </>
      )}
    </div>
  );
}