import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ReadResourceResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { ListResourcesResultSchema } from "@modelcontextprotocol/sdk/types.js";

console.log('Starting client...');

const transport = new StdioClientTransport({
  command: "node",
  args: ["--loader", "ts-node/esm", "src/index.ts"]
});

const client = new Client({
  name: "example-client",
  version: "1.0.0",
}, {
  capabilities: {}
});

console.log('Connecting to server...');
await client.connect(transport);
console.log('Connected to server!');

// List available resources
console.log('Requesting resources list...');
const resources = await client.request(
  { method: "resources/list" },
  ListResourcesResultSchema
);
console.log('Resources:', resources);

// Read a specific resource
console.log('Reading resource...');
const resourceContent = await client.request(
  {
    method: "resources/read",
    params: {
      uri: "file:///example.txt"
    }
  },
  ReadResourceResultSchema
);
console.log('Resource content:', resourceContent);