import { randTwoSide, rand, randNonZero } from "../utils";

export const lessonLatex = `\\[
\\text{To determine the nature of the roots of a function, we must consider the determinant.} \\\\
\\text{For a function in the form } \\\\ ax^2 + bx + c \\\\
\\text{the determinant is } \\\\ b^2 - 4ac. \\\\ \\\\
\\text{For example, } \\\\ 3x^2 + 2x + 1 \\\\ \\text{ has determinant } \\\\ 2^2 - 4 \\times 3 \\times 1 = -8. \\\\ \\\\
\\text{Now with the determinant, there are three possibilities:} \\\\
\\text{If equal to zero: there are 'equal roots';} \\\\
\\text{If greater than zero: there are 'real and distinct roots';} \\\\
\\text{If less than zero: there are 'no real roots'.} \\\\ \\\\
\\text{In the case above, -8 < 0, so there are no real roots.} \\\\ \\\\ 
\\boxed{
\\small\\text{The terminology can seem odd but it is important to use the correct words.} \\\\
\\small\\text{The 'roots' are the points where a curve touches the x-axis.} \\\\
\\small\\text{The determinant can be thought of as the distance between those points,} \\\\
\\small\\text{so if there is a positive distance then the points are apart (distinct),} \\\\
\\small\\text{if there is no difference then the points are at the same point (equal),} \\\\
\\small\\text{and if there is a negative distance between them then that makes no sense so there are no real roots.} \\\\ \\\\
\\small\\text{Be careful about the signs in multiplying -4ac.}
}
\\]`;

export function getRandomQuestion() {
  //Find answer then parameters so all outcomes are likely enough.
  const answer = randAnswer(); 
  const p = getParameters(answer);

  return {
    instruction: "Determine the roots of the function:",
    latex: getLatex(p),
    postamble: "Answer 0 for no real roots; 1 for equal roots; 2 for real and distinct roots.",
    answer,
    diagram: null
  };
}

function randAnswer() {
  return rand(3)-1;
}

function getParameters(answer) {
  if (answer === 1) {
    while (true) {
      const a = randNonZero(4);
      const t = randTwoSide(4);

      const b = 2 * a * t;
      const c = a * t * t;

      if (Math.abs(b) <= 8 && Math.abs(c) <= 8) {
        return { a, b, c };
      }
    }
  }

  if (answer === 2) {
    while (true) {
      const a = randNonZero(8);
      const b = randTwoSide(8);
      const c = randTwoSide(8);

      const det = b * b - 4 * a * c;
      if (det > 0) {
        return { a, b, c };
      }
    }
  }

  while (true) {
    const a = randNonZero(8);
    const b = randTwoSide(8);
    const c = randTwoSide(8);

    const det = b * b - 4 * a * c;
    if (det < 0) {
      return { a, b, c };
    }
  }
}

function getLatex({a, b, c}) {
  let output = `f(x) = `;

  if (a !== 0) {
    if (a !== 1 && a !== -1) output += a;
    output += `x^{2} `;
  }

  if (b !== 0) {
    if (b > 0) output += `+ `;
    if (b !== 1 && b !== -1) output += b;
    if (b == -1) output += `-`;
    output += `x `;
  }

  if (c !== 0) {
    if (c > 0) output += `+ `;
    output += c;
  }

  return `\\[ ${output} \\]`;
}
