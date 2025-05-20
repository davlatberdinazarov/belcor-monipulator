// utils/commandOptimizer.ts

// 2-bosqich: run-length optimallashtirish
export function optimizeCommands(input: string): string {
  let result = '';
  let count = 1;

  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++;
    } else {
      result += (count > 1 ? count : '') + input[i - 1];
      count = 1;
    }
  }

  return result;
}

// 3-bosqich: pattern-based advanced optimallashtirish
export function advancedOptimize(input: string): string {
  const blocks: string[] = [];
  let i = 0;

  // Takrorlanuvchi bloklarni topamiz
  while (i < input.length) {
    let j = i + 1;
    while (j < input.length && input[j] === input[j - 1]) {
      j++;
    }
    blocks.push(input.slice(i, j));
    i = j;
  }

  let result = '';
  let k = 0;

  while (k < blocks.length) {
    let count = 1;
    while (
      k + count < blocks.length &&
      blocks[k + count] === blocks[k]
    ) {
      count++;
    }

    const pattern = optimizeCommands(blocks[k]);
    if (count > 1) {
      result += `${count}(${pattern})`;
    } else {
      result += pattern;
    }

    k += count;
  }

  return result;
}
