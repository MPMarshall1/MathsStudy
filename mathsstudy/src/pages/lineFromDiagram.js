import { rand, randTwoSide, randNonZero} from "../utils";

export const lessonLatex = `\\[
\\text{The equation of a line is in the form} \\\\ y=mx+c \\\\
\\text{where m is the gradient (slope) and c is the intercept: where the line crosses the vertical x-axis.} \\\\ \\\\
\\text{We can calculate m from the two points that we have with the formula} \\\\ m = \\frac{y_2 - y_1}{x_2 - x_1} \\\\
\\text{It doesn't matter which point is '1' or '2'; you can choose.} \\\\
\\text{Remember that coordinates have x's before y's, like } (x_1, y_1) \\\\ \\\\
\\text{So for coordinates of } (1, 3) \\text{ and } (2, 5) \\text{, we calculate} \\\\
m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{5 - 3}{2 - 1} = \\frac{2}{1} = 2 \\\\ \\\\
\\text{Now to find c, we use the formula} \\\\ y-b = m(x-a) \\\\
\\text {where b and a are one of the coordinates mapped to } (a, b) \\text{and m we have.} \\\\ \\\\
\\text{For us:} \\\\
y-3 = 2(x-1) \\\\
y-3 = 2x-2 \\\\
y = 2x+1 \\\\
\\text{This is our final answer.} \\\\ \\\\
\\text{If your m is a fraction, you can multiply out the bottom before you break the bracket, like} \\\\ \\\\
y-3 = \\frac{2}{3}(x-1) \\\\
\\text{(Multiply everything by 3.)} \\\\
3y-9 = 2(x-1) \\\\
3y-9 = 2x-2 \\\\
3y = 2x + 7 \\\\
\\text{It is also ok to have a number like 3 in front of the y.}
\\]`;

export function getRandomQuestion() {
  const answer = getAnswer();
  const p = getParameters(answer);

  return {
    instruction: "Find the equation of the line AB.",
    latex: null,
    postamble: "Answer in the form y=2x+3",
    answer,
    diagram: makeGraph(p)
  };
}

function getAnswer() {
  const m = randNonZero(3);
  const c = randNonZero(3);
  
  let answer = `y=`
  if (m !== 1 && m !== -1) answer += m;
  if (m == -1) answer += `-`;
  answer += `x`;
  if (c>0) answer += `+`;
  
  answer += c;

  return answer;
}

function getParameters(answer) {
  const { m, c } = parseLine(answer);

  let x1 = randTwoSide(2);
  let x2 = randTwoSide(2);

  while (x2==x1) x2 = randTwoSide(2);
  
  let y1 = m*x1+c;
  let y2 = m*x2+c;

  return {x1, y1, x2, y2};
}

function makeGraph(p) {
  const {
    x1, y1, x2, y2,
    width = 400,
    height = 400,
    padding = 40
  } = p;

  const A = [x1, y1];
  const B = [x2, y2];

  // --- coordinate extents including origin if needed ---
  const xs = [x1, x2, 0];
  const ys = [y1, y2, 0];

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // add a little margin so unused quadrants are only narrowly shown
  const marginX = (maxX - minX) * 0.1 || 1;
  const marginY = (maxY - minY) * 0.1 || 1;

  const viewMinX = minX - marginX;
  const viewMaxX = maxX + marginX;
  const viewMinY = minY - marginY;
  const viewMaxY = maxY + marginY;

  // helpers to map math coords -> SVG coords
  const scaleX = (width - 2 * padding) / (viewMaxX - viewMinX);
  const scaleY = (height - 2 * padding) / (viewMaxY - viewMinY);

  const toSvgX = x => padding + (x - viewMinX) * scaleX;
  const toSvgY = y => height - padding - (y - viewMinY) * scaleY;

  // --- axes (only where needed) ---
  const showYAxis = viewMinX <= 0 && viewMaxX >= 0;
  const showXAxis = viewMinY <= 0 && viewMaxY >= 0;

  const axisElements = [];

  if (showXAxis) {
    axisElements.push(`
      <line x1="${toSvgX(viewMinX)}" y1="${toSvgY(0)}"
            x2="${toSvgX(viewMaxX)}" y2="${toSvgY(0)}"
            stroke="white" stroke-width="2" />
    `);
  }

  if (showYAxis) {
    axisElements.push(`
      <line x1="${toSvgX(0)}" y1="${toSvgY(viewMinY)}"
            x2="${toSvgX(0)}" y2="${toSvgY(viewMaxY)}"
            stroke="white" stroke-width="2" />
    `);
  }

  // --- line through A and B, extended slightly past the points ---
  const dx = x2 - x1;
  const dy = y2 - y1;
  const slope = dy / dx;

  // extend 10% beyond each side in x
  const extraX = (viewMaxX - viewMinX) * 0.1;
  const lineMinX = Math.min(x1, x2) - extraX;
  const lineMaxX = Math.max(x1, x2) + extraX;

  const lineMinY = y1 + slope * (lineMinX - x1);
  const lineMaxY = y1 + slope * (lineMaxX - x1);

  const lineElement = `
    <line x1="${toSvgX(lineMinX)}" y1="${toSvgY(lineMinY)}"
          x2="${toSvgX(lineMaxX)}" y2="${toSvgY(lineMaxY)}"
          stroke="white" stroke-width="2" />
  `;

  // --- points A and B ---
  const pointElements = `
    <circle cx="${toSvgX(A[0])}" cy="${toSvgY(A[1])}" r="4" fill="white" />
    <circle cx="${toSvgX(B[0])}" cy="${toSvgY(B[1])}" r="4" fill="white" />
  `;

  // --- labels (white text) ---
  const textElements = `
    <text x="${toSvgX(A[0]) + 8}" y="${toSvgY(A[1]) - 8}"
          fill="white" font-size="12">A(${x1}, ${y1})</text>
    <text x="${toSvgX(B[0]) + 8}" y="${toSvgY(B[1]) - 8}"
          fill="white" font-size="12">B(${x2}, ${y2})</text>
    ${showXAxis && showYAxis ? `
      <text x="${toSvgX(0) + 6}" y="${toSvgY(0) - 6}"
            fill="white" font-size="12">O</text>
    ` : ""}
  `;

  const svg = `
    <svg width="${width}" height="${height}"
         viewBox="0 0 ${width} ${height}"
         xmlns="http://www.w3.org/2000/svg">
      ${axisElements.join("\n")}
      ${lineElement}
      ${pointElements}
      ${textElements}
    </svg>
  `;

  return svg;
}

function parseLine(answer) {
  // Supports: y=x+2, y=-x-3, y=2x+3, y=-3x-2, etc.
  const match = answer.match(/^y=([+-]?\d*)x([+-]\d+)?$/);

  if (!match) {
    throw new Error(`Cannot parse answer: ${answer}`);
  }

  let mStr = match[1];
  let cStr = match[2] || "+0";

  // Handle implicit 1 / -1
  if (mStr === "" || mStr === "+") mStr = "1";
  if (mStr === "-") mStr = "-1";

  const m = parseInt(mStr, 10);
  const c = parseInt(cStr, 10);

  return { m, c };
}