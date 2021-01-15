mod utils;

use rand::prelude::*;
use wasm_bindgen::prelude::*;

use ray_tracer::vector::Vec3;

use ray_tracer::constants::Axis;

use ray_tracer::hitable::primitive::Cube;
use ray_tracer::hitable::primitive::Rectangle;
use ray_tracer::hitable::primitive::Sphere;
use ray_tracer::hitable::transform::Translation;
use ray_tracer::hitable::Hitable as HitableInternal;

use ray_tracer::material::dielectric::DielectricMaterial;
use ray_tracer::material::lambertian::LambertianMaterial;
use ray_tracer::material::metal::MetalMaterial;
use ray_tracer::material::plain::PlainMaterial;
use ray_tracer::material::Material as MaterialInternal;

use ray_tracer::texture::checker::CheckerTexture;
use ray_tracer::texture::uniform::UniformTexture;
use ray_tracer::texture::Texture as TextureInternal;

use ray_tracer::actor::Actor as ActorInternal;

use ray_tracer::camera::perspective::PerspectiveCamera;
use ray_tracer::camera::Camera as CameraInternal;

use ray_tracer::renderer::Renderer as RendererInternal;
use ray_tracer::scene::Scene as SceneInternal;

use ray_tracer::tree::TreeType;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

fn index_to_axis(index: usize) -> Axis {
    match index {
        0 => Axis::X,
        1 => Axis::Y,
        _ => Axis::Z,
    }
}

fn index_to_tree(index: usize) -> TreeType {
    match index {
        0 => TreeType::Linear,
        1 => TreeType::Linear,
        _ => TreeType::Oct,
    }
}

#[wasm_bindgen]
pub struct Hitable {
    wrapped: Box<dyn HitableInternal<f64>>,
}

#[wasm_bindgen]
impl Hitable {
    pub fn sphere(radius: f64) -> Self {
        Hitable {
            wrapped: Box::new(Sphere::new(radius)),
        }
    }

    pub fn cube(length: f64, width: f64, height: f64) -> Self {
        Hitable {
            wrapped: Box::new(Cube::new(length, width, height)),
        }
    }

    pub fn rectangle(width: f64, width_axis: usize, height: f64, height_axis: usize) -> Self {
        let width_axis = index_to_axis(width_axis);
        let height_axis = index_to_axis(height_axis);
        Hitable {
            wrapped: Box::new(Rectangle::new(width, width_axis, height, height_axis)),
        }
    }

    pub fn translation(hitable: Hitable, offset: &[f64]) -> Self {
        Hitable {
            wrapped: Box::new(Translation::new(hitable.wrapped, Vec3::from_slice(offset))),
        }
    }
}

#[wasm_bindgen]
pub struct Texture {
    wrapped: Box<dyn TextureInternal<f64>>,
}

#[wasm_bindgen]
impl Texture {
    pub fn uniform(color: &[f64]) -> Self {
        let color = Vec3::<f64>::from_slice(color);
        Texture {
            wrapped: Box::new(UniformTexture::<f64>::new(color)),
        }
    }

    pub fn checker(texture0: Texture, texture1: Texture) -> Self {
        Texture {
            wrapped: Box::new(CheckerTexture::new(texture0.wrapped, texture1.wrapped)),
        }
    }
}

#[wasm_bindgen]
pub struct Material {
    wrapped: Box<dyn MaterialInternal<f64>>,
}

#[wasm_bindgen]
impl Material {
    pub fn plain(texture: Texture) -> Self {
        Material {
            wrapped: Box::new(PlainMaterial::<f64>::new(texture.wrapped)),
        }
    }

    pub fn lambertian(texture: Texture, dimming: f64) -> Self {
        Material {
            wrapped: Box::new(LambertianMaterial::<f64>::new(texture.wrapped, dimming)),
        }
    }

    pub fn metal(texture: Texture, fuzziness: f64) -> Self {
        Material {
            wrapped: Box::new(MetalMaterial::<f64>::new(texture.wrapped, fuzziness)),
        }
    }

    pub fn dielectric(texture: Texture, n: f64) -> Self {
        Material {
            wrapped: Box::new(DielectricMaterial::<f64>::new(texture.wrapped, n)),
        }
    }
}

#[wasm_bindgen]
pub struct Actor {
    wrapped: Box<ActorInternal<f64>>,
}

#[wasm_bindgen]
impl Actor {
    pub fn new(hitable: Hitable, material: Material) -> Self {
        Actor {
            wrapped: Box::new(ActorInternal {
                hitable: hitable.wrapped,
                material: material.wrapped,
            }),
        }
    }
}

#[wasm_bindgen]
pub struct Scene {
    wrapped: Box<SceneInternal<f64>>,
}

#[wasm_bindgen]
impl Scene {
    pub fn new() -> Self {
        Scene {
            wrapped: Box::new(SceneInternal::<f64>::new()),
        }
    }

    pub fn add_actor(&mut self, actor: Actor) {
        self.wrapped.add_actor(*actor.wrapped);
    }

    pub fn set_background(&mut self, color: &[f64]) {
        self.wrapped.set_background(Vec3::from_slice(color))
    }

    pub fn set_tree_type(&mut self, tree_type: usize) {
        let tree_type = index_to_tree(tree_type);
        self.wrapped.set_tree_type(tree_type);
    }
}

#[wasm_bindgen]
pub struct Camera {
    wrapped: Box<dyn CameraInternal<f64>>,
}

#[wasm_bindgen]
impl Camera {
    pub fn new() -> Self {
        let wrapped: Box<dyn CameraInternal<f64>> = Box::new(PerspectiveCamera::new());
        Camera { wrapped }
    }

    pub fn set_aspect(&mut self, aspect: f64) {
        self.wrapped.set_aspect(aspect);
    }

    pub fn set_fov(&mut self, fov: f64) {
        self.wrapped.set_fov(fov);
    }

    pub fn set_position(&mut self, position: &[f64]) {
        self.wrapped.set_position(position);
    }

    pub fn set_direction(&mut self, direction: &[f64]) {
        self.wrapped.set_direction(direction);
    }

    pub fn set_lookat(&mut self, lookat: &[f64]) {
        self.wrapped.set_lookat(lookat);
    }

    pub fn set_up(&mut self, up: &[f64]) {
        self.wrapped.set_up(up);
    }
}

#[wasm_bindgen]
pub struct Renderer {
    width: usize,
    height: usize,
    wrapped: Box<RendererInternal>,
}

#[wasm_bindgen]
impl Renderer {
    pub fn new(
        width: usize,
        height: usize,
        sampling: usize,
        reflections: usize,
        antialiasing: bool,
    ) -> Self {
        Renderer {
            width,
            height,
            wrapped: Box::new(RendererInternal::new(
                width,
                height,
                sampling,
                reflections,
                antialiasing,
            )),
        }
    }

    pub fn render(&self, scene: &Scene, camera: &Camera, image: &mut [f64]) {
        let inner_image = self.wrapped.render(&scene.wrapped, &*camera.wrapped);
        for i in 0..self.width * self.height * 3 {
            image[i] = inner_image.data[i];
        }
    }

    pub fn render_pixel(
        &self,
        i: usize,
        j: usize,
        scene: &Scene,
        camera: &Camera,
        color: &mut [f64],
    ) {
        let inner_color = self
            .wrapped
            .render_pixel(i, j, &scene.wrapped, &*camera.wrapped);
        for i in 0..3 {
            color[i] = inner_color.get_data()[i];
        }
    }

    pub fn render_chunk(
        &self,
        start: usize,
        stop: usize,
        scene: &Scene,
        camera: &Camera,
        color: &mut [f64],
    ) {
        for k in start..stop {
            let i = k / self.width;
            let j = k % self.width;
            let inner_color = self
                .wrapped
                .render_pixel(j, i, &scene.wrapped, &*camera.wrapped);
            let idx = k - start;
            for l in 0..3 {
                color[idx * 3 + l] = inner_color.get_data()[l];
            }
        }
    }
}
