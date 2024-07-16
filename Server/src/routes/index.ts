import { FastifyInstance } from "fastify";
import { SubscriberController } from "../controllers/SubscriberController";

const subscriberController = new SubscriberController();

export async function routes(fastify: FastifyInstance) {
  fastify.get("/", async function handler(request, reply) {
    return { hello: "dasn" };
  });

  fastify.post("/subscribers", (request, reply) =>
    subscriberController.create(request, reply)
  );
}
