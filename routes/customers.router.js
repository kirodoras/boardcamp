import express from "express";
import { listCustomers, getCustomer } from "../controllers/customers.controller.js";
import { checkCustomerExists } from "../middlewares/customers.middleware.js";
const customersRouter = express.Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id", checkCustomerExists, getCustomer);

export default customersRouter;