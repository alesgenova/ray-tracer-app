import React, { Component } from 'react';
import './App.css';

import HeaderComponent from './components/header';
import LoaderComponent from './components/loader';
import DisplayComponent from './components/display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneName: 'random',
      resolution: 20,
      reflections: 8,
      loading: false,
      loaded: false,
      gamma: 2.0
    }
  }

  onStart = () => {
    this.setState(state => {
      state.loading = false;
      state.loaded = true;
      return state;
    });
  }

  onStop = () => {
    this.setState(state => {
      state.loading = false;
      state.loaded = false;
      return state;
    })
  }

  onParamChange = (key, value) => {
    this.setState(state => {
      state[key] = value;
      return state;
    })
  }

  render() {
    const { sceneName, resolution, reflections, gamma, loaded, loading } = this.state;

    return (
      <div className="app">
        <HeaderComponent />

        <div className="content-container">
          
          {!loaded &&
          <LoaderComponent
            sceneName={sceneName}
            resolution={resolution}
            reflections={reflections}
            gamma={gamma}
            onParamChange={this.onParamChange}
            onStart={this.onStart}
            loading={loading}
          />
          }

          {loaded &&
          <DisplayComponent
            sceneName={sceneName}
            width={resolution * 16}
            height={resolution * 9}
            reflections={reflections}
            gamma={gamma}
            onStop={this.onStop}
          />       
          }
        
        </div>
      </div>
    );
  }
}

export default App;
