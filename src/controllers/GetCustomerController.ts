import { FastifyRequest, FastifyReply } from "fastify";
import { GetCustomerService } from "../services/GetCustomerService";

class GetCustomerController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { id } = request.params as { id: string } 
        
        const getCustomersService = new GetCustomerService();
        const customer = await getCustomersService.execute(id);
        response.send(customer);
    }
}

export { GetCustomerController }