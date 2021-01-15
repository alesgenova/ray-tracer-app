export function makeRng(_seed: number) {
  let seed = _seed % 2147483647;
  if (seed <= 0) seed += 2147483646;

  return function (): number {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  }
}
