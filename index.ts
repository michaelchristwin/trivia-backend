import dbConnector from "./db/connector";
import Fastify from "fastify";
import routes from "./routes/api.users";
import cors from "@fastify/cors";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

const session_secret = process.env.SESSION_SECRET as string;
export const fastify = Fastify({
  logger: true,
});
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: session_secret,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
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
    await fastify.listen({ port: 3001 });
    console.log(`Listening on: http://localhost:3001 🚀`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
