export type WorkerMethods = {
  initialize: (scene: string, width: number, height: number, reflections: number, seed: number) => void;
  renderChunk: (start: number, stop: number, iteration: number) => Float64Array;
}
