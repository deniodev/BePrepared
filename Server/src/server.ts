import Fastify from "fastify";
import { generateSixDigitsNumber } from "./utils/utils";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler(request, reply) {
  return { hello: "dasn" };
});

fastify.post("/subscribers", (request, reply) => {
  const { phone, provinceId, districtId } = request.body;

  const savedUser = { phone, provinceId, districtId };

  const otp = generateSixDigitsNumber();
  console.log(otp);

  return reply.status(201).send(savedUser);
});

fastify.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
