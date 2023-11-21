import prismaClient from '../prisma';

interface CreateCustomerProps {
  name: string;
  email: string;
  cep: string;
}

interface Endereco {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}
class CreateCustomerService {
  async execute({ name, email, cep }: CreateCustomerProps) {

    if (!name || !email) {
      throw new Error('Nome e email são obrigatórios');
    }

    this.getEnderecoByCep(cep)
      .then(async endereco => {
        const customer = await prismaClient.customer.create({
          data: {
            name: name,
            email: email,
            cep: cep,
            endereco: {
              create: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                localidade: endereco.localidade,
                uf: endereco.uf,
                ibge: endereco.ibge,
                gia: endereco.gia,
                ddd: endereco.ddd,
                siafi: endereco.siafi
              }
            }
          },
          include: {
            endereco: true,
          }
        });
        console.log(customer)
        return customer;
      }).catch(async error => {
        const customer = await prismaClient.customer.create({
          data: {
            name,
            email,
            cep,
          }
        });
        return customer;
      })
  }

  async getEnderecoByCep(cep: string): Promise<Endereco> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as Endereco
      })
  }
}

export { CreateCustomerService }