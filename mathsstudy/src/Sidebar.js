export default function Sidebar({ topic, setTopic }) {
  return (
    <aside className="sidebar">

      <div className="subtopic-level">
        <button
          className={`sidebar-link ${topic === "fractions" ? "active" : ""}`}
          onClick={() => setTopic("fractions")}
        >
          Fractions
        </button>

        <button
          className={`sidebar-link ${topic === "rationalDenominator" ? "active" : ""}`}
          onClick={() => setTopic("rationalDenominator")}
        >
          Rational Denominators
        </button>

        <button
          className={`sidebar-link ${topic === "rootsNature" ? "active" : ""}`}
          onClick={() => setTopic("rootsNature")}
        >
          Nature of Roots
        </button>

        <button
          className={`sidebar-link ${topic === "lineFromDiagram" ? "active" : ""}`}
          onClick={() => setTopic("lineFromDiagram")}
        >
          Line Equation from Diagram
        </button>
      </div>
      
    </aside>
  );
}
