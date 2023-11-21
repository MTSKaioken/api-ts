import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";



class CreateCustomerController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { name, email, cep } = request.body as { name: string, email: string, cep: string };

        const customerService = new CreateCustomerService();
        const customer = await customerService.execute({ name, email, cep });

        response.send(customer);
    }
}

export { CreateCustomerController }