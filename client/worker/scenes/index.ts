import randomScene from './random';
import roomScene from './room';

export function createScene(name: string, aspect: number, seed: number) {
  if (name === 'random') {
    return randomScene(aspect, seed);
  } else {
    return roomScene(aspect);
  }
}
