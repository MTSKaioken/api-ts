import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController  } from "../controllers/CreateCustomerController";
import { ListCustomersController } from "../controllers/ListCustomersController";
import { GetCustomerController } from "../controllers/GetCustomerController";
import { DeleteCustomerController } from "../controllers/DeleteCustomerController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/customers", async (request: FastifyRequest, response: FastifyReply) => {
        return new ListCustomersController().handle(request, response);
    })

    fastify.get("/customer/:id?", async (request: FastifyRequest, response: FastifyReply) => {
        return new GetCustomerController().handle(request, response);
    })

    fastify.post("/customers", async (request: FastifyRequest, response: FastifyReply) => {
        return new CreateCustomerController().handle(request, response);
    })

    fastify.delete("/customers/:id?", async (request: FastifyRequest, response: FastifyReply) => {
        return new DeleteCustomerController().handle(request, response);
    })
}

