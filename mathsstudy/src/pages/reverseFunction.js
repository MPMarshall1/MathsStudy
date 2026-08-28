import { randTwoSide } from "../utils";

export const lessonLatex = `\\[
\\text{Too schrimple.}
\\]`;

export function getRandomQuestion() {
  const p = getParameters();
  const result = calculate(p)

  return {
    instruction: getInstruction(result),
    latex: getLatex(p),
    postamble: "",
    answer: p.x,
    diagram: null
  };
}

function getInstruction(result) {
  return "Given that f(p)="+result+", find the value of p.";
}

function calculate({m, x, c}) {
  return m*x+c;
}

function getParameters() {
  const m = randTwoSide(10);
  const x = randTwoSide(10);
  const c = randTwoSide(10);

  return {m,x,c};
}

function getLatex({m,x,c}) {
  let output = `f(x) = `;

  if (m !== 1 && m !== -1) output += m;
  output += `x `;

  if (c > 0) output += `+ `;
  output += c;

  return `\\[ ${output} \\]`;
}
