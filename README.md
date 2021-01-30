# Ray Tracer Demo
A ray tracing demo using Rust and WebAssembly

## Live Demo
[![Demo Page](./demo_small.png)](https://alesgenova.github.io/ray-tracer-app/)

## Components
### Core Ray Tracing Engine
- Rust ([source](https://github.com/alesgenova/ray-tracer))

### Communication with web worker
- post-me ([source](https://github.com/alesgenova/post-me))

### WebAssembly Wrapper
- Rust / wasm-bindgen ([source](https://github.com/alesgenova/ray-tracer-app/tree/master/wasm))

### Single Page App
- React ([source](https://github.com/alesgenova/ray-tracer-app/tree/master/client))

### Building
```bash
# Build wasm
# Prerequisite: cargo and wasm-pack
cd wasm
wasm-pack build --target web

# Start the app
cd ../client
npm install
npm run start
```
