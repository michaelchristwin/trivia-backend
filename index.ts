import dbConnector from "./db/connector";
import Fastify from "fastify";
import routes from "./routes/api.users";
import cors from "@fastify/cors";

export const fastify = Fastify({
  logger: true,
});
fastify.register(routes);
fastify.register(cors, {
  //origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
fastify.register(dbConnector);
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3002 });
    console.log(`Listening on: http://localhost:3002 🚀`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
