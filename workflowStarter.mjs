import {
    orkesConductorClient,
   WorkflowExecutor
  } from "@io-orkes/conductor-javascript";
  
  
  
  // app.mjs
  
  import express from 'express';
  
  const app = express();
  const port = 8000;
  
  // Middleware to parse JSON requests
  app.use(express.json());
  
  // Example route
  app.get('/', (req, res) => {
    // Call the async function
    startWorkflow();
    res.send('Hello, this is your Express API!');
  });
  
  // Example route with dynamic parameter
  app.get('/api/getStatus/:id', async (req, res) => {
    console.log("Running api get status");
    const { id } = req.params;
    console.log("Id is : " + id);
  
    const clientPromise = orkesConductorClient({
      keyId: "0ff79d9e-e836-4d79-9460-934ac09ecd34",
      keySecret: "jzc3B9ams1W83Q8T0sStFUjw3li5sQVdn9WzmxzMA3yXwEQt",
      serverUrl: "https://play.orkes.io/api",
    });
  
    const client = await clientPromise;
    const executor = new WorkflowExecutor(client);
    console.log("Getting status");
  
    executor.getExecution(id, true)
    .then((workflowStatus) => {
      // Print the WorkflowStatus
      console.log("Workflow Status:", workflowStatus);
    })
    .catch((error) => {
      // Handle any errors that might occur during the request
      console.error("Error getting workflow status:", error);
    });
  
    res.send('Hello, this is your Express API!');
  });
  
  // Example route for POST request
  app.post('/api/greet', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  
  
  async function startWorkflow() {
    try {
      //API client instance with server address and authentication details
      const clientPromise = orkesConductorClient({
        keyId: "1c07ec1e-d2b4-46dc-93b7-48beb3641429",
        keySecret: "QncegVBQ9gwc0lLllG1Voh87R65Q2ZVp0ec7SNt9TwTsvC6T",
        serverUrl: "https://play.orkes.io/api",
      });
  
      const client = await clientPromise;
  
      // Using Factory function
      const executor = new WorkflowExecutor(client);
      const name = "ADSS";
      const version = "1";
      const executionId = await executor.startWorkflow({ name, version, input: {"switchCaseValue":"0","distanceofdrone":"under50ft"} });
      console.log("Execution id is: " + executionId);
  
      // Additional logic if needed...
  
    } catch (error) {
      console.error("Error:", error);
    }
  }