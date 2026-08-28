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
          Line Equation From Diagram
        </button>

        <button
          className={`sidebar-link ${topic === "volumeOfSphere" ? "active" : ""}`}
          onClick={() => setTopic("volumeOfSphere")}
        >
          Volume of Sphere
        </button>

        <button
          className={`sidebar-link ${topic === "evaluateFunction" ? "active" : ""}`}
          onClick={() => setTopic("evaluateFunction")}
        >
          Evaluate Functions
        </button>

                <button
          className={`sidebar-link ${topic === "reverseFunction" ? "active" : ""}`}
          onClick={() => setTopic("reverseFunction")}
        >
          Reverse Functions
        </button>
      </div>
      
    </aside>
  );
}
