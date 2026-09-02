import { rand,  toSignificantFigures} from "../utils";

export const lessonLatex = `\\[
\\text{The volume of a sphere is } V = \\frac{4}{3}\\pi r^{3} \\\\
\\text{where r is the radius.} \\\\ \\\\
\\text{For a radius of 5cm, we calculate the volume as} \\\\
V = \\frac{4}{3}\\pi\\times5^{3} = \\frac{4}{3}\\pi\\times125 = 523.59... = 524cm^{3} \\text{ to 3 significant figures.} \\\\ \\\\
\\text{Remember to round to however many significant figures.} \\\\
\\text{Also remeber that the volume units will be the length units cubed, eg } cm \\text{ -> } cm^{3} \\\\ \\\\
\\text{Instead of giving the radius, some questions will give the diameter.} \\\\
\\text{We can find the radius by halving the diameter:} \\\\
r = \\frac{D}{2}
\\]`;

export function getRandomQuestion() {
  const showDiameter = rand(2)===2; // sometimes show diameter, sometimes radius
  const radius = rand(10) + 5;
  const answer = getAnswer(radius);
  const p = getParameters(radius, showDiameter);

  return {
    instruction: "Calculate the volume of the sphere.",
    latex: getLatex(radius, showDiameter),
    postamble: "Give your answer correct to 3 significant figures. Omit cm^3.",
    answer,
    diagram: makeDiagram(p)
  };
}

function getLatex(r, isD) {
  if (isD) return `The sphere's diameter is `+2*r+`cm.`;
  return `The sphere's radius is `+r+`cm.`;
}

function getAnswer(radius) {
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  const rounded = toSignificantFigures(volume, 3);
  const formatted = formatNumber(rounded);

  // Return only the numeric value (no units, no "V=")
  return `${formatted}`;
}

function getParameters(radius, showDiameter) {
  const cx = 0;
  const cy = 0;
  const diameter = 2 * radius;

  return {
    radius,
    diameter,
    showDiameter,
    cx,
    cy
  };
}

function makeDiagram(p) {
  const {
    radius,
    diameter,
    showDiameter,
    cx = 0,
    cy = 0,
    width = 400,
    height = 300,
    padding = 30
  } = p;

  const svgCx = width / 2;
  const svgCy = height / 2 - 10;
  const scale = Math.min((width - 2 * padding) / (diameter + 10), (height - 2 * padding) / (diameter + 10));
  const rSvg = radius * scale;

  let measurementElements = "";
  if (showDiameter) {
    const x1 = svgCx - rSvg;
    const x2 = svgCx + rSvg;
    const y = svgCy + rSvg + 20;

    measurementElements = `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="white" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="${svgCx}" y="${y + 16}" fill="white" font-size="14" text-anchor="middle"> ${diameter} cm</text>
    `;
  } else {
    const x1 = svgCx;
    const y1 = svgCy;
    const x2 = svgCx + rSvg;
    const y2 = svgCy;

    measurementElements = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="${(x1 + x2) / 2}" y="${y1 - 10}" fill="white" font-size="14" text-anchor="middle"> ${radius} cm</text>
    `;
  }

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L10,5 L0,10 z" fill="white" />
        </marker>
      </defs>

      <rect x="0" y="0" width="${width}" height="${height}" fill="#222" />

      <circle cx="${svgCx}" cy="${svgCy}" r="${rSvg}" fill="none" stroke="white" stroke-width="3" />

      ${measurementElements}
    </svg>
  `;

  return svg;
}

function formatNumber(num) {
  if (Math.abs(num - Math.round(num)) < 1e-9) {
    return String(Math.round(num));
  }
  let s = num.toPrecision(12);
  s = s.replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  return s;
}