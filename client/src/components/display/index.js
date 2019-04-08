import React, { Component } from 'react';

import { BACKGROUND, SECONDARY, SECONDARY_LIGHT, SECONDARY_TEXT, PRIMARY_LIGHT } from '../../constants/colors';

import StopIcon from '../../icons/stop.svg';
import PauseIcon from '../../icons/pause.svg';
import PlayIcon from '../../icons/play.svg';

import { createScene } from '../../scenes';
import { Renderer } from 'ray-tracer-wasm';

class DisplayComponent extends Component {

  canvas;
  context;
  imageData;
  scene;
  camera;
  renderer;
  previewRenderer;
  width;
  height;
  imageElement;
  pause;

  iteration;
  currentIndex;

  constructor(props) {
    super(props);
    this.state = {
      pause: false
    }
  }

  componentDidMount() {

    const {
      width, height,
      sceneName,
      reflections
    } = this.props;

    this.pause = false;

    this.width = width;
    this.height = height;

    let aspect = width / height;
    let { scene, camera } = createScene(sceneName, aspect);
    this.scene = scene;
    this.camera = camera;
    this.previewRenderer = Renderer.new(width, height, 0, 0, false);
    this.renderer = Renderer.new(width, height, 0, reflections, false);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.imageData = this.context.createImageData(this.width, this.height);
    this.imageElement.src = this.canvas.toDataURL();

    this.image = new Float64Array(this.width * this.height * 3);

    this.chunkSize = 1000;

    this.maxIteration = 256;

    this.mainLoop(0, -1);
  }

  componentDidUpdate() {
    this.context = this.canvas.getContext('2d');
    this.imageData = this.context.createImageData(this.width, this.height);
  }

  componentWillUnmount() {
    this.pause = true;
  }

  computePixel = (index) => {
    return new Promise((resolve) => {
      let color = new Float64Array(3);
      let i = Math.floor(index / this.width);
      let j = index % this.width;
      this.renderer.render_pixel(j, i, this.scene, this.camera, color);
      resolve({i, j, color});
    });
  }

  mainLoop = (index, iteration) => {
    if (this.pause || iteration > this.maxIteration) {
      return;
    }

    let renderer = this.renderer;
    if (iteration < 0) {
      renderer = this.previewRenderer;
    }

    let color = new Float64Array(3);
    const stop = Math.min(this.width * this.height, index + this.chunkSize);
    for (let k = index; k < stop; ++k) {
      let i = Math.floor(k / this.width);
      let j = k % this.width;
      renderer.render_pixel(j, i, this.scene, this.camera, color);
      this.updateImage(k, iteration, color);
    }

    this.updateCanvas(this.image);
    
    let newIndex = stop;
    let newIteration = iteration;
    if (stop === this.width * this.height) {
      newIndex = 0;
      newIteration += 1;
    }

    this.currentIndex = stop;
    this.iteration = newIteration;

    requestAnimationFrame(() => {
      this.mainLoop(newIndex, newIteration);
    });
  }

  updateImage(index, iteration, color) {
    iteration = Math.max(0, iteration);
    let frac = 1 / (iteration + 1);
    for (let i = 0; i < 3; ++i) {
      this.image[index * 3 + i] = (1 - frac) * this.image[index * 3 + i] + frac * color[i];
    }
  }

  updateCanvas(data) {
    const { gamma } = this.props;
    let gammaInv = 1 / gamma;
    for (let i = 0; i < this.width * this.height; ++i) {
      this.imageData.data[i * 4] = Math.pow(data[i * 3], gammaInv) * 255;
      this.imageData.data[i * 4 + 1] = Math.pow(data[i * 3 + 1], gammaInv) * 255;
      this.imageData.data[i * 4 + 2] = Math.pow(data[i * 3 + 2], gammaInv) * 255;
      this.imageData.data[i * 4 + 3] = 255;
    }
    this.context.putImageData(this.imageData, 0, 0);
    this.imageElement.src = this.canvas.toDataURL();
  }

  onPause = () => {
    const pause = this.pause;

    this.pause = !pause;
    if (pause) {
      this.mainLoop(this.currentIndex, this.iteration);
    }

    this.setState(state => {
      state.pause = !pause;
      return state;
    });
  }

  onStop = () => {

  }

  render() {
    const { onStop } = this.props;
    const { pause } = this.state;

    return (
      <div className="full" style={{position: 'relative'}}>
        <div style={{width: '100%', maxWidth: '75rem', position: 'absolute', left: '50%', top: '2rem', transform: 'translateX(-50%)'}}>
          <div style={{width: '100%'}}>
            <img style={{width: '100%'}} ref={ref => {this.imageElement = ref;}}/>
          </div>
        </div>
        <div className="floating-container-center">
          <button
            onClick={this.onPause}
            className="floating-button-large"
            style={{backgroundColor: PRIMARY_LIGHT, color: SECONDARY_TEXT, marginRight: '1rem'}}
          >
            <ion-icon src={pause ? PlayIcon : PauseIcon}/>
          </button>
          <button
            onClick={onStop}
            className="floating-button-large"
            style={{backgroundColor: SECONDARY, color: SECONDARY_TEXT}}
          >
            <ion-icon src={StopIcon}/>
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayComponent;
