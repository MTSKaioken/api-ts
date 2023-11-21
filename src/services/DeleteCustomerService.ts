import prismaClient from "../prisma";

class DeleteCustomerService {

    async execute(id: string) {
        if (!id) {
            throw new Error("ID inválido");
        }

        const customer = await prismaClient.customer.delete({
            where: {
                id: id
            }
        })

        if(!customer) {
            throw new Error("Cliente não encontrado");
        }

        await prismaClient.customer.delete({
            where: {
                id: customer.id
            }
        })

        return { message: "Cliente deletado com sucesso" }
    }
}

export { DeleteCustomerService }