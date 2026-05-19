// questions.js

export function getRandomQuestion() {
  return { latex: `Evaluate \\[ \\frac{2}{3}\\times4\\frac{2}{5} \\]`, answer: "44/15" };
}


export const lessonLatex = `To evaluate \\[ 2\\frac{4}{5}\\times\\frac{2}{7} \\] begin by bringing any leading number(s), in this case 2, into their fraction(s). The first fraction then has the numerator (top number) \\[ 2\\times5+4 = 14\\] We now have \\[ \\frac{14}{5}\\times\\frac{2}{7} \\] The fractions are now in the correct form to be multiplied. Multiply both the numerators and denominators. \\[ \\frac{14\\times2}{5\\times7} = \\frac{28}{35}\\] We now check that the new numerator and denominator are in their simplest form. Since 28 and 35 have a common factor (7), we can simplify. \\[ \\frac{28}{35} = \\frac{28\\div7}{35\\div7} = \\frac{4}{5}\\] 4 and 5 have no common factors so our answer is in its final form.`;
