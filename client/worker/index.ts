import init, { Renderer, Scene, Camera } from 'ray-tracer-wasm';
import { WorkerMessenger, ChildHandshake } from 'post-me';
import "regenerator-runtime";

import { WorkerMethods } from './types';
import { createScene } from './scenes';

init('./ray_tracer_wasm_bg.wasm').then(() => {
  const messenger = new WorkerMessenger({ worker: self as any });

  let scene: Scene;
  let camera: Camera;
  let width: number;
  let height: number;
  let renderer: Renderer;
  let previewRenderer: Renderer;

  const methods: WorkerMethods = {
    initialize: (sceneName, _width, _height, reflections, seed) => {
      const out = createScene(sceneName, _width / _height, seed);
      scene = out.scene;
      camera = out.camera;
      width = _width;
      height = _height;
      renderer = Renderer.new(width, height, 0, reflections, false);
      previewRenderer = Renderer.new(width, height, 0, 0, false);
    },
    renderChunk: (start, stop, iteration) => {
      if (!renderer) {
        throw new Error("Can't render, the scene wasn't initialized");
      }

      let theRenderer = renderer;
      if (iteration < 0) {
        theRenderer = previewRenderer;
      }

      const size = stop - start;
      const result = new Float64Array(size * 3);

      theRenderer.render_chunk(start, stop, scene, camera, result);

      // let color = new Float64Array(3);
      // for (let k = start; k < stop; ++k) {
      //   let i = Math.floor(k / width);
      //   let j = k % width;
      //   theRenderer.render_pixel(j, i, scene, camera, color);
      //   let idx = k - start;
      //   result[idx * 3] = color[0];
      //   result[idx * 3 + 1] = color[1];
      //   result[idx * 3 + 2] = color[2];
      // }

      return result;
    }
  }

  ChildHandshake(messenger, methods);
});
