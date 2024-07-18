// Implementation 1: Iterative Approach

function sum_to_a(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Implementation 2: Mathematical Formula

function sum_to_b(n) {
  return (n * (n + 1)) / 2;
}

// Implementation 3: Recursive Approach

function sum_to_c(n) {
  if (n === 1) {
    return 1;
  }

  return n + sum_to_c(n - 1);
}
