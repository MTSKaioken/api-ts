import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const listCustomersService = new ListCustomersService();
        const customers = await listCustomersService.execute();
        response.send(customers);
    }
}

export { ListCustomersController }