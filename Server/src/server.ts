import Fastify from "fastify";
import { routes } from "./routes";
import "./database/redis";

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
