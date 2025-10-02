import { z } from "zod"; // switching this to import from zod/v4 works fine
import {Routing, createConfig, defaultEndpointsFactory, Documentation} from "express-zod-api";
import {writeFileSync} from "node:fs";

const config = createConfig({
  http: { listen: 8090 }, // port, UNIX socket or Net::ListenOptions
  cors: false, // decide whether to enable CORS
});

// method 1 for providing example
const input = z.object({
  name: z.string().optional(),
})//.example({name: 'bingo'})

// method 2 for providing example
const output = z.object({
  greetings: z.string(),
}).meta({examples: [{greetings: 'foo'}]})

const helloWorldEndpoint = defaultEndpointsFactory.build({
  // method: "get" (default) or array ["get", "post", ...]
  input,
  output,
  handler: async ({ input: { name }, options, logger }) => {
    logger.debug("Options:", options); // middlewares provide options
    return { greetings: `Hello, ${name || "World"}. Happy coding!` };
  },
});

const routing: Routing = {
  v1: {
    hello: helloWorldEndpoint,
  },
};

writeFileSync(
    "example.documentation.yaml",
    new Documentation({
      routing,
      config,
      version: '1',
      title: "Example API",
      serverUrl: "https://example.com",
      tags: {
        users: "Everything about the users",
        files: "Everything about the files processing",
        subscriptions: "Everything about the subscriptions",
      },
    }).getSpecAsYaml(),
    "utf-8",
);
