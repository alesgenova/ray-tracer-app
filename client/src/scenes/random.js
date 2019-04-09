import {
  Actor,
  Hitable,
  Camera,
  Material,
  Texture,
  Scene
} from 'ray-tracer-wasm';

export default function(aspect) {
  let scene = Scene.new();
  // scene.set_background([0.5, 0.7, 0.9]);
  scene.set_background([0.25, 0.35, 0.45]);

  const N_SPHERES_X = 20;
  const N_SPHERES_Y = N_SPHERES_X;

  const MIN_X = -25.0;
  const MAX_X = 25.0;

  const MIN_Y = MIN_X;
  const MAX_Y = MAX_X;

  const MIN_RADIUS = 0.2;
  const MAX_RADIUS = 0.4;

  const SPHERE_PROBABILITY = 0.66666666;

  const LAMBERTIAN_PROBABILITY = 0.3333;
  const METAL_PROBABILITY = 0.3333;
  // DIELECTRIC_PROBABILITY is 1 - LAMBERTIAN_PROBABILITY - METAL_PROBABILITY

  const MIN_FUZZINESS = 0.0;
  const MAX_FUZZINESS = 0.2;

  const MIN_REFRACTIVE = 1.2;
  const MAX_REFRACTIVE = 2.4;

  for (let i = 0; i < N_SPHERES_X; ++i) {
    for (let j = 0; j < N_SPHERES_Y; ++j) {
      let radius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * Math.random();
      let x = i + Math.random() * (1.0 - radius);
      x = MIN_X + (MAX_X - MIN_X) * x / N_SPHERES_X;
      let y = j + Math.random() * (1.0 - radius);
      y = MIN_Y + (MAX_Y - MIN_Y) * y / N_SPHERES_Y;

      let hitableRand = Math.random();
      let hitable;
      if (hitableRand < SPHERE_PROBABILITY) {
        hitable = Hitable.sphere(radius);
        hitable = Hitable.translation(hitable, [x, y, radius]);
      } else {
        let l = radius * 2.0 * 0.75;
        hitable = Hitable.cube(l, l, l);
        hitable = Hitable.translation(hitable, [x, y, radius * 0.75]);
      }

      let color = [Math.random(), Math.random(), Math.random()];
      let texture = Texture.uniform(color);

      let materialRand = Math.random();
      let material;
      if (materialRand < LAMBERTIAN_PROBABILITY) {
        material = Material.lambertian(texture, 0.65);
      } else if (materialRand < METAL_PROBABILITY) {
        let fuzziness = MIN_FUZZINESS + (MAX_FUZZINESS - MIN_FUZZINESS) * Math.random();
        material = Material.metal(texture, fuzziness);
      } else {
        let n = MIN_REFRACTIVE + (MAX_REFRACTIVE - MIN_REFRACTIVE) * Math.random();
        material = Material.dielectric(texture, n);
      }

      let actor = Actor.new(hitable, material);
      scene.add_actor(actor);
    }
  }

  let radius = 2.0;
  {
  let hitable = Hitable.sphere(radius);
  hitable = Hitable.translation(hitable, [0.0, 0.0, radius]);
  let color = new Float64Array([0.85, 1.0, 0.85]);
  let texture = Texture.uniform(color);
  let material = Material.dielectric(texture, 2.4);
  let actor = Actor.new(hitable, material);
  scene.add_actor(actor);
  }

  {
  let hitable = Hitable.sphere(radius);
  hitable = Hitable.translation(hitable, [0.0, - 2.1 * radius, radius]);
  let color = new Float64Array([0.9, 0.9, 0.9]);
  let texture = Texture.uniform(color);
  let material = Material.metal(texture, 0.00001);
  let actor = Actor.new(hitable, material);
  scene.add_actor(actor);
  }

  {
  let hitable = Hitable.sphere(radius);
  hitable = Hitable.translation(hitable, [0.0, 2.1 * radius, radius]);
  let color = new Float64Array([1.0, 0.25, 0.25]);
  let texture = Texture.uniform(color);
  let material = Material.metal(texture, 0.05);
  let actor = Actor.new(hitable, material);
  scene.add_actor(actor);
  }

  // Floor
  {
  let radius = 4000.0
  let hitable = Hitable.sphere(radius);
  hitable = Hitable.translation(hitable, [0.0, 0.0, -radius]);
  let texture0 = Texture.uniform([1.0, 1.0, 1.0]);
  let texture1 = Texture.uniform([0.85, 0.85, 0.85]);
  let texture = Texture.checker(texture0, texture1);
  let material = Material.lambertian(texture, 0.7);
  let actor = Actor.new(hitable, material);
  scene.add_actor(actor);
  }

  // Light
  {
  let hitable = Hitable.sphere(4.0);
  hitable = Hitable.translation(hitable, [0.0, 5.0, 15.2]);
  let color = new Float64Array([1.0, 1.0, 1.0]);
  let texture = Texture.uniform(color);
  let material = Material.plain(texture);
  let actor = Actor.new(hitable, material);
  scene.add_actor(actor);
  }

  let camera = Camera.new();
  camera.set_aspect(aspect);
  camera.set_fov(Math.PI * 0.25);
  camera.set_position(new Float64Array([-6.0, -10.0, 2.0]));
  camera.set_lookat(new Float64Array([0.0, 0.0, 2.0]));
  camera.set_up(new Float64Array([0.0, 0.0, 1.0]));

  scene.set_tree_type(2);
  return { scene, camera };
}
