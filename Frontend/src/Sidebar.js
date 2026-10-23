export default function Sidebar({ topic, setTopic, mobileMenuOpen, setMobileMenuOpen }) {
  function selectTopic(newTopic) {
    setTopic(newTopic);
    setMobileMenuOpen(false);
  }

  return (
    <>
      {/* BACKDROP: Only visible when mobileMenuOpen is true. 
          Clicking this (the area outside the sidebar) closes the menu. */}
      {mobileMenuOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '60px', // Below header
            left: 0,
            width: '100%',
            height: 'calc(100% - 60px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
            zIndex: 999, // Behind sidebar (1000) but above content
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      <aside className={`sidebar ${mobileMenuOpen ? "active" : ""}`}>
        <div className="subtopic-level">
          <button className={`sidebar-link ${topic === "fractions" ? "active" : ""}`}
            onClick={() => selectTopic("fractions")}>Fractions</button>

          <button className={`sidebar-link ${topic === "rationalDenominator" ? "active" : ""}`}
            onClick={() => selectTopic("rationalDenominator")}>Rational Denominators</button>

          <button className={`sidebar-link ${topic === "rootsNature" ? "active" : ""}`}
            onClick={() => selectTopic("rootsNature")}>Nature of Roots</button>

          <button className={`sidebar-link ${topic === "linesFromDiagram" ? "active" : ""}`}
            onClick={() => selectTopic("linesFromDiagram")}>Line Equation From Diagram</button>

          <button className={`sidebar-link ${topic === "volumeOfSphere" ? "active" : ""}`}
            onClick={() => selectTopic("volumeOfSphere")}>Volume of Sphere</button>

          <button className={`sidebar-link ${topic === "evaluateFunction" ? "active" : ""}`}
            onClick={() => selectTopic("evaluateFunction")}>Evaluate Functions</button>

          <button className={`sidebar-link ${topic === "reverseFunction" ? "active" : ""}`}
            onClick={() => selectTopic("reverseFunction")}>Reverse Functions</button>
        </div>
      </aside>
    </>
  );
}
