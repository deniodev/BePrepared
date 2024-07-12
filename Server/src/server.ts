import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler(request, reply) {
  return { hello: "dasn" };
});

fastify.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
