import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import type { FastifyInstance } from "fastify";
export const uri = `mongodb+srv://kelechukwuchristwin:F9JJMZJZj7ljBjcy@michael.fqimwas.mongodb.net`;

async function dbConnector(fastify: FastifyInstance, options: any) {
  fastify.register(fastifyMongo, {
    url: uri,
    forceClose: true,
    w: "majority",
    retryWrites: true,
    appName: "michael",
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector);
