export function rand(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function randTwoSide(max) {
  let sign = Math.floor(Math.random() * 2);
  if (sign==0) {sign = -1;}

  return sign * rand(max);
}

export function round(n) {
  return Math.round(n);
}

export function randNonZero(max) {
  let x = 0;
  while (x === 0) x = randTwoSide(max);
  return x;
}