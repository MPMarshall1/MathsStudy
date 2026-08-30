import { randTwoSide } from "../utils";

export const lessonLatex = `\\[
\\text{We are looking for in the input value to the function which evaluates to a given answer.} \\\\ \\\\
\\text{If we have the function} f(x)= 5x+7 \\\\ 
\\text{and are looking for p where } f(p)=47 \\\\
\\text{first translate the function from x to p.} \\\\
f(x)= 5x+7 \\text{ ---> } f(p)= 5p+7 \\\\ \\\\
\\text{Now, replace } f(p) \\text{ with the given value 47.} \\\\
f(p) = 5p+7 \\\\
47 = 5p+7 \\\\ \\\\
\\text{Now solve the equation for p.} \\\\
47 = 5p+7 \\\\
5p+7 = 47 \\\\
5p = 40 \\\\
p = 8
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
