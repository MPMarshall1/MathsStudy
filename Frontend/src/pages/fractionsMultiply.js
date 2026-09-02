import { rand, gcd } from "../utils";

export const lessonLatex = `\\[
\\text{To evaluate } \\\\ 2\\frac{4}{5}\\times\\frac{2}{7} \\\\
\\text{begin by bringing any leading number(s), in this case 2, into their fraction(s). } \\\\ \\\\
\\text{The first fraction then has the numerator (top number) } \\\\ 2\\times5+4 = 14. \\\\ \\\\
\\text{We now have } \\\\ \\frac{14}{5}\\times\\frac{2}{7} \\\\ \\\\
\\text{The fractions are now in the correct form to be multiplied.} \\\\
\\text{Multiply both the numerators and denominators.} \\\\ \\frac{14\\times2}{5\\times7} = \\frac{28}{35}\\ \\\\ \\\\
\\text{We now check that the new numerator and denominator are in their simplest form.} \\\\
\\text{Since 28 and 35 have a common factor (7), we can simplify.} \\\\ \\frac{28}{35} = \\frac{28\\div7}{35\\div7} = \\frac{4}{5} \\\\ \\\\
\\text{4 and 5 have no common factors so our answer is in its final form.}
\\]` 

export function getRandomQuestion() {
  const p = getParameters();

  return {
    instruction: "Evaluate",
    latex: getLatex(p),
    postamble: "Write fractions in the form 1/2.",
    answer: getAnswer(p),
    diagram: null
  };
}

function getParameters() {
  const a = rand(3);
  const c = rand(7) + 2; // 2–8
  const d = rand(3);
  const f = rand(7) + 2; // 2–8

  let b = rand(c);
  while (b % c === 0) b = rand(c);

  let e = rand(f);
  while (e % f === 0) e = rand(f);

  return { a, b, c, d, e, f };
}

function getLatex({ a, b, c, d, e, f }) {
  return `\\[ `+a+` \\frac{`+b+`}{`+c+`} \\times `+d+` \\frac{`+e+`}{`+f+`} \\]`;
}

function getAnswer({ a, b, c, d, e, f }) {
  const num = (a * c + b) * (d * f + e);
  const den = c * f;

  const g = gcd(num, den);

  if (den / g === 1) return `${num / g}`;

  return `${num / g}/${den / g}`;
}
