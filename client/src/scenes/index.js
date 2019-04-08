import randomScene from './random';
import roomScene from './room';

export function createScene(name, aspect) {
  if (name === 'random') {
    return randomScene(aspect);
  } else {
    return roomScene(aspect);
  }
}
