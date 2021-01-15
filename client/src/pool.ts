import { Connection } from 'post-me';

type Task = {
  methodName: string;
  args: any[];
  resolve: (value: any) => void;
  reject: (error: any) => void
}

export class WorkerPool {
  _workers: Connection[];
  _status: { [x: number]: number };
  _tasks: Task[];

  constructor(workers: Connection[]) {
    this._workers = workers;
    this._tasks = [];
    this._status = {};
    this._workers.forEach((_, i) => {
      this._status[i] = 0;
    });
  }

  call(methodName: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tasks.push({
        methodName, args,
        resolve, reject
      });

      this.popTask();
    })
  }

  broadcast(methodName: string, ...args: any[]): Promise<any>[] {
    const results: Promise<any>[] = [];
    this._workers.forEach((_, workerId) => {
      results.push(
        new Promise((resolve, reject) => {
          this.executeTask(workerId, { methodName, args, resolve, reject });
        })
      )
    })

    return results;
  }

  private popTask() {
    if (this._tasks.length === 0) {
      return;
    }

    let availableWorker: number | undefined;
    Object.entries(this._status).forEach(([workerId, status]) => {
      if (status === 0) {
        availableWorker = parseInt(workerId);
      }
    });

    if (availableWorker !== undefined) {
      const task = this._tasks[0];
      this._tasks = this._tasks.slice(1, this._tasks.length);
      this.executeTask(availableWorker, task);
    }
  }

  private executeTask(workerId: number, task: Task) {
    this._status[workerId] += 1;
    const { methodName, args, resolve, reject } = task;
    const connection = this._workers[workerId];
    connection.remoteHandle().call(methodName, ...args)
      .then(result => {
        resolve(result);
        this._status[workerId] -= 1;
        this.popTask();
      })
      .catch(err => {
        reject(err);
        this._status[workerId] -= 1;
        this.popTask();
      });
  }
}