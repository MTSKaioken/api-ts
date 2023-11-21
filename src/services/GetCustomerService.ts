import prismaClient from "../prisma";

class GetCustomerService {
    async execute(id: string) {

        if(!id) {
            throw new Error("ID inválido");
        }

        const customer = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        });

        if(!customer) {
            throw new Error("Cliente não encontrado");
        }

        return customer;

    }
}

export { GetCustomerService }