import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteCustomerService } from "../services/DeleteCustomerService"

class DeleteCustomerController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { id } = request.params as { id: string } 

        const customerService = new DeleteCustomerService();

        const customer = await customerService.execute(id);

        response.send(customer);
    }
}

export { DeleteCustomerController }