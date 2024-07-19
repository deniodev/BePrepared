import { FastifyInstance } from "fastify";
import { SubscriberController } from "../controllers/SubscriberController";
import { AuthController } from "../controllers/AuthController";

const subscriberController = new SubscriberController();
const authController = new AuthController();

export async function routes(fastify: FastifyInstance) {
  fastify.get("/alerts", async function handler(request, reply) {
    return { hello: "dasn" };
  });

  fastify.post("/subscribers", (request, reply) =>
    subscriberController.create(request, reply)
  );
  fastify.put("/subscribers", (request, reply) =>
    subscriberController.update(request, reply)
  );

  fastify.post("/auth/subscribers/otp", (request, reply) =>
    authController.authOtp(request, reply)
  );
  fastify.post("/auth/subscribers", (request, reply) =>
    authController.loginSubscriber(request, reply)
  );
}
