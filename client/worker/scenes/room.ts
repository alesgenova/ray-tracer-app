import {
  Actor,
  Hitable,
  Camera,
  Material,
  Texture,
  Scene
} from 'ray-tracer-wasm';

export default function (aspect: number) {
  let scene = Scene.new();
  scene.set_background([0.5, 0.5, 0.5] as any);

  let length = 16;
  let width = 16;
  let height = 9;

  let dimming = 0.75;

  // Floor
  {
    let hitable = Hitable.rectangle(length, 0, width, 1);
    hitable = Hitable.translation(hitable, [0.0, 0.0, -height / 2.0] as any);
    let texture0 = Texture.uniform([1.0, 1.0, 1.0] as any);
    let texture1 = Texture.uniform([0.8, 0.8, 0.8] as any);
    let texture = Texture.checker(texture0, texture1);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Ceiling
  {
    let hitable = Hitable.rectangle(width, 1, length, 0);
    hitable = Hitable.translation(hitable, [0.0, 0.0, height / 2.0] as any);
    let texture = Texture.uniform([1.0, 1.0, 1.0] as any);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Front
  {
    let hitable = Hitable.rectangle(length, 0, height, 2);
    hitable = Hitable.translation(hitable, [0.0, width / 2.0, 0.0] as any);
    let texture = Texture.uniform([1.0, 1.0, 1.0] as any);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Back
  {
    let hitable = Hitable.rectangle(height, 2, length, 0);
    hitable = Hitable.translation(hitable, [0.0, - width / 2.0, 0.0] as any);
    let texture = Texture.uniform([1.0, 1.0, 1.0] as any);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Left
  {
    let hitable = Hitable.rectangle(width, 1, height, 2);
    hitable = Hitable.translation(hitable, [-length / 2.0, 0.0, 0.0] as any);
    let texture = Texture.uniform([0.2, 1.0, 0.2] as any);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Right
  {
    let hitable = Hitable.rectangle(height, 2, width, 1);
    hitable = Hitable.translation(hitable, [length / 2.0, 0.0, 0.0] as any);
    let texture = Texture.uniform([1.0, 0.2, 0.2] as any);
    let material = Material.lambertian(texture, dimming);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Light
  let lightSize = length * 0.25;
  {
    let hitable = Hitable.cube(lightSize, lightSize, 0.125 * lightSize);
    hitable = Hitable.translation(hitable, [0.0, width / 4.0, height / 2.0] as any);
    let texture = Texture.uniform([1.0, 1.0, 1.0] as any);
    let material = Material.plain(texture);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Metal sphere
  {
    let radius = 2.0
    let hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [-length / 5.0, width / 4, - 0.5 * height + radius] as any);
    let texture = Texture.uniform([0.9, 0.9, 0.9] as any);
    let material = Material.metal(texture, 0.0);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  // Glass sphere
  {
    let radius = 2.0
    let hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [length / 5.0, width / 6.0, - 0.5 * height + radius] as any);
    let texture = Texture.uniform([1.0, 1.0, 1.0] as any);
    let material = Material.dielectric(texture, 2.4);
    let actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }

  let camera = Camera.new();
  camera.set_aspect(aspect);
  camera.set_fov(Math.PI * 0.35);
  camera.set_position([0.0, - 0.49 * width, 0.0] as any);
  camera.set_direction([0.0, 1.0, 0.0] as any);
  camera.set_up([0.0, 0.0, 1.0] as any);

  scene.set_tree_type(2);
  return { scene, camera };
}
