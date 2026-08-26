import { rand, gcd } from "../utils";

export const lessonLatex = `\\[
\\text{By expressing a fraction with a rational denominator,} \\\\
\\text{what we mean is finding an equivalent fraction without the square root on the bottom.} \\\\
\\text{To keep the fractions equivalent, we can multiply/devide top and bottom by the same thing.} \\\\ \\\\
\\text{We start by mutliplying both by the square root on the bottom:} \\\\
\\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{\\sqrt{3}\\sqrt{3}} \\\\ \\\\
\\text{We multiply by this to remove the root on the bottom,} \\\\
\\text{as a root times itself becomes whatever is inside: here, 3} \\\\
\\frac{2\\sqrt{3}}{\\sqrt{3}\\sqrt{3}} = \\frac{2\\sqrt{3}}{3} \\\\ \\\\
\\text{This now has a rational demoninator. (It is ok to have a root on top.)} \\\\
\\text{Don't forget to check for a common factor here. The 2 and 3 do not simplify so this is fine.}
\\]` 

export function getRandomQuestion() {
  const p = getParameters();

  return {
    instruction: "Express the following with a rational demoninator:",
    latex: getLatex(p),
    postamble: "Write fractions in the form 1/2 and square roots in the form sqrt(2).",
    answer: getAnswer(p),
    diagram: null
  };
}

function getParameters() {
  const a = rand(10);
  const b = rand(10);
  return {a, b};

}

function getLatex({ a, b, c, d, e, f }) {
  return `\\[ \\frac{`+a+`}{\\sqrt{`+b+`}} \\]`;
}

function getAnswer({a, b}) {
  const d = gcd(a,b);
  return (a/d)+"sqrt("+b+")/"+(b/d);
}
