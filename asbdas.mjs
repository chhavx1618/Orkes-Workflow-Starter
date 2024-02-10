import { ConductorWorker, Task } from "@io-orkes/conductor-javascript";


import {
    OrkesApiConfig,
    orkesConductorClient,
    TaskRunner,
  } from "@io-orkes/conductor-javascript";
//    worker: ConductorWorker = {
//     taskDefName: "task-def-name",
//     execute: async (
//       task: Task
//     ): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> => {},
//   };
  const clientPromise = orkesConductorClient({
    keyId: "XXX", // optional
    keySecret: "XXXX", // optional
    serverUrl: "https://play.orkes.io/api",
  });
  
  const client = await clientPromise;
  
  const taskDefName = "HelloWorldWorker";
  
   customWorker: ConductorWorker = {
  taskDefName,
    execute: async ({ inputData, taskId }) => {
      return {
        outputData: {
          greeting: "Hello World",
        },
        status: "COMPLETED",
      };
    },
  };
  // Worker Options will take precedence over options defined in the manager
  
  const manager = new TaskManager(client, [customWorker], {
    options: { pollInterval: 100, concurrency: 1 },
  });
  
  manager.startPolling();
  // You can update all worker settings at once using
  manager.updatePollingOptions({ pollInterval: 100, concurrency: 1 });
  
  // You can update a single worker setting using :
  manager.updatePollingOptionForWorker(taskDefName, {
    pollInterval: 100,
    concurrency: 1,
  });
  
  manager.isPolling // Will resolve to true
  
  await manager.stopPolling();
  
  manager.isPolling // Will resolve to false
  