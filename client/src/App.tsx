import React from 'react';
import { WorkerMessenger, ParentHandshake, DebugMessenger, Connection, debug } from "post-me";

import './App.css';

import HeaderComponent from './components/header';
import LoaderComponent from './components/loader';
import DisplayComponent from './components/display';

import { WorkerPool } from './pool';

interface Props { };
export interface State {
  loading: boolean;
  loaded: boolean;
  sceneName: string;
  resolution: number;
  reflections: number;
  gamma: number;
  workerPool?: WorkerPool;
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sceneName: 'random',
      resolution: 20,
      reflections: 8,
      loading: true,
      loaded: false,
      gamma: 2.0,
      workerPool: undefined,
    }
  }

  componentDidMount() {
    const nWorkers = 2;

    const handshakes: Promise<Connection>[] = [];

    for (let i = 0; i < nWorkers; ++i) {
      const worker = new Worker(`${process.env.PUBLIC_URL}/ray-tracer/worker.js`);
      let messenger = new WorkerMessenger({ worker });
      // const log = debug(`post-me:parent${i}`);
      // messenger = DebugMessenger(messenger, log);
      handshakes.push(ParentHandshake(messenger, {}, 10, 1000));
    }

    Promise.all(handshakes).then((connections) => {
      const workerPool = new WorkerPool(connections);
      this.setState(state => {
        return { ...state, workerPool, loading: false };
      });
    })
  }

  onStart = () => {
    this.setState(state => {
      return { ...state, loaded: true };
    });
  }

  onStop = () => {
    this.setState(state => {
      return { ...state, loaded: false };
    });
  }

  onParamChange = <K extends keyof State>(key: K, value: State[K]) => {
    this.setState(state => {
      return {
        ...state,
        [key]: value,
      };
    })
  }

  render() {
    const { sceneName, resolution, reflections, gamma, workerPool, loaded, loading } = this.state;

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

          {(loaded && workerPool) &&
            <DisplayComponent
              sceneName={sceneName}
              workerPool={workerPool}
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
