import { randTwoSide } from "../utils";

export const lessonLatex = `\\[
\\text{To evaluate a function, replace the } x \\text{ in the function with the given value.} \\\\ \\\\
\\text{For example, with} \\\\ f(x) = 3x-4 \\\\ \\text{to evaluate at } f(5) \\text{,} \\\\
\\text{replace the } x \\text{ in the function with } 5 \\\\ \\\\
f(x) = 3x-4 \\\\
f(5) = 3(5)-4 \\\\
f(5) = 15-4 \\\\
f(5) = 11 
\\]`;

export function getRandomQuestion() {
  const p = getParameters();

  return {
    instruction: getInstruction(p),
    latex: getLatex(p),
    postamble: "",
    answer: getAnswer(p),
    diagram: null
  };
}

function getInstruction({m, x, c}) {
  return "Evaluate f("+x+").";
}

function getAnswer({m, x, c}) {
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
