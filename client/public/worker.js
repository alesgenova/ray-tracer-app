self.onmessage = function(ev) {
  console.log('worker event', ev);
  let color = new Float32Array(3);
  const { scene, camera, renderer, i, j } = ev.data;
  renderer.render_pixel(i, j, scene, camera, color);

  self.postMessage(i, j, color);
}
