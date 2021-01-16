import React from 'react';

import { BACKGROUND, PRIMARY, PRIMARY_LIGHT, PRIMARY_TEXT } from '../../constants/colors';

import PlayIcon from '../../icons/play.svg';

export default ({ sceneName, gamma, resolution, reflections, onParamChange, onStart, loading }) => {
  return (
    <React.Fragment>
      <div className="content" style={{ textAlign: 'center' }}>
        <h2>
          Rust + WebAssembly Path Tracer
        </h2>

        <h3>
          Author
        </h3>
        <span>
          Alessandro Genova
        </span>

        <h3>
          Core Library
        </h3>
        <span>
          <a href="https://github.com/alesgenova/ray-tracer" target="_blank">Source</a>
          <br />
          (rust)
        </span>

        <h3>
          Demo App
        </h3>
        <span>
          <a href="https://github.com/alesgenova/ray-tracer-app" target="_blank">Source</a>
          <br />
          (wasm, react)
        </span>

        <br />

        <h3>
          Scene
        </h3>
        <select value={sceneName} onChange={(e) => { onParamChange('sceneName', e.target.value) }}>
          <option value="random">Random</option>
          <option value="room">Room</option>
        </select>

        <h3>
          Resolution
        </h3>
        <select value={resolution} onChange={(e) => { onParamChange('resolution', e.target.value) }}>
          <option value={10}>{`${10 * 16} x ${10 * 9}`}</option>
          <option value={20}>{`${20 * 16} x ${20 * 9}`}</option>
          <option value={40}>{`${40 * 16} x ${40 * 9}`}</option>
          <option value={80}>{`${80 * 16} x ${80 * 9}`}</option>
        </select>

        <h3>
          Reflections
        </h3>
        <select value={reflections} onChange={(e) => { onParamChange('reflections', e.target.value) }}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
        </select>

        <h3>
          Gamma
        </h3>
        <select value={gamma} onChange={(e) => { onParamChange('gamma', e.target.value) }}>
          <option value={1.0}>1.0</option>
          <option value={1.5}>1.5</option>
          <option value={2.0}>2.0</option>
          <option value={2.5}>2.5</option>
          <option value={3.0}>3.0</option>
        </select>
      </div>
      <div className="floating-container-center">
        <button
          disabled={loading}
          onClick={onStart}
          className="floating-button-large"
          style={{ backgroundColor: loading ? PRIMARY_LIGHT : PRIMARY, color: PRIMARY_TEXT }}
        >
          <img src={PlayIcon} />
        </button>
      </div>
    </React.Fragment>
  )
}
