import type { FastifyInstance, FastifyRequest } from "fastify";
import User from "../models/User";
import type { PluginMetadata } from "fastify-plugin";
import hashPassword from "../utils/hash_password";
interface BodyType {
  email: string;
  password: string;
}
async function routes(fastify: FastifyInstance, options: PluginMetadata) {
  fastify.post(
    "/api/users",
    async (request: FastifyRequest<{ Body: BodyType }>, reply) => {
      try {
        const db = fastify.mongo.client.db("user");
        if (!db) {
          throw new Error("DB is undefined");
        }
        const collection = db.collection("users");
        const newUser = new User({
          email: request.body.email,
          password: await hashPassword(request.body.password),
        });
        const result = await collection.insertOne(newUser);
        return reply.status(201).send({ insertedId: result.insertedId });
      } catch (err) {
        console.error("Error saving users", err);
        reply
          .status(500)
          .send({ error: "An error occurred while creating user" });
      }
    }
  );
}

export default routes;
