import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/customers';

const app = Fastify({logger: true});

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})


const start = async () => {
    try {
        
        const dotenv = require('dotenv');
        dotenv.config()
        const porta = process.env.PORTA_APPLICATION || 3000;

        await app.listen(porta, () => {
            console.log(`Server is running on port ${porta}`);
        });

        //await app.register(cors);
        await app.register(routes);

    } catch (error) {
        console.log(error);
    }
}

start();
