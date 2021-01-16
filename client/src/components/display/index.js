import React, { Component } from 'react';

import { BACKGROUND, SECONDARY, SECONDARY_LIGHT, SECONDARY_TEXT, PRIMARY_LIGHT } from '../../constants/colors';

import StopIcon from '../../icons/stop.svg';
import PauseIcon from '../../icons/pause.svg';
import PlayIcon from '../../icons/play.svg';

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
      reflections,
      workerPool
    } = this.props;

    this.pause = false;

    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.imageData = this.context.createImageData(this.width, this.height);
    this.imageElement.src = this.canvas.toDataURL();

    this.image = new Float64Array(this.width * this.height * 3);

    this.chunkSize = 2000;

    this.maxIteration = 256;

    const seed = Math.floor(Math.random() * 2147483646);
    Promise.all(
      workerPool.broadcast('initialize', sceneName, width, height, reflections, seed)
    ).then(() => {
      this.mainLoop(-1);
    });
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
      resolve({ i, j, color });
    });
  }

  mainLoop = (iteration) => {
    this.iteration = iteration;

    if (this.pause || iteration > this.maxIteration) {
      return;
    }

    const { workerPool } = this.props;

    const tasks = [];
    const size = this.width * this.height;
    let start = 0;
    let stop = Math.min(size, start + this.chunkSize);
    const t0 = new Date();
    while (start < size) {
      const thisStart = start;
      const thisStop = stop;
      tasks.push(
        workerPool.call('renderChunk', thisStart, thisStop, iteration).then((colors) => {
          this.updateImage(thisStart, thisStop, iteration, colors);
          this.updateCanvas(this.image);
        })
      );
      start = stop;
      stop = Math.min(size, start + this.chunkSize);
    }

    Promise.all(tasks).then(() => {
      const t1 = new Date();
      console.log("All tasks done!", iteration, "Elapsed: ", (t1 - t0) / 1000);
      requestAnimationFrame(() => {
        this.mainLoop(iteration + 1);
      });
    });
  }

  updateImage(start, stop, iteration, colors) {
    iteration = Math.max(0, iteration);
    let frac = 1 / (iteration + 1);
    for (let j = 0; j < stop - start; ++j) {
      const index = j + start;
      for (let i = 0; i < 3; ++i) {
        this.image[index * 3 + i] = (1 - frac) * this.image[index * 3 + i] + frac * colors[j * 3 + i];
      }
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
    if (this.imageElement) {
      this.imageElement.src = this.canvas.toDataURL();
    }
  }

  onPause = () => {
    const pause = this.pause;

    this.pause = !pause;
    if (pause) {
      this.mainLoop(this.iteration);
    }

    this.setState(state => {
      state.pause = !pause;
      return state;
    });
  }

  render() {
    const { onStop } = this.props;
    const { pause } = this.state;

    return (
      <React.Fragment>
        <div className="content" style={{ textAlign: 'center' }}>
          <img style={{ width: '100%' }} ref={ref => { this.imageElement = ref; }} />
        </div>
        <div className="floating-container-center">
          <button
            onClick={this.onPause}
            className="floating-button-large"
            style={{ backgroundColor: PRIMARY_LIGHT, color: SECONDARY_TEXT, marginRight: '1rem' }}
          >
            <img src={pause ? PlayIcon : PauseIcon} />
          </button>
          <button
            onClick={onStop}
            className="floating-button-large"
            style={{ backgroundColor: SECONDARY, color: SECONDARY_TEXT }}
          >
            <img src={StopIcon} />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayComponent;
