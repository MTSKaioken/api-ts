import { createCustomerController } from "../controllers/customersController";

import express from 'express';

const router = express.Router();

console.log('customers route')

router.post('/', createCustomerController);

module.exports = router;

