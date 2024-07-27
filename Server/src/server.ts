import Fastify from "fastify";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes";
import "./database/redis";
import { firebaseConfig } from "./config/firebase";

const firebaseApp = initializeApp(firebaseConfig);

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
