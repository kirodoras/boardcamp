import express from "express";
import { listCustomers, getCustomer, insertCustomer } from "../controllers/customers.controller.js";
import { checkCustomerExists, validateCustomer } from "../middlewares/customers.middleware.js";
const customersRouter = express.Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id", checkCustomerExists, getCustomer);
customersRouter.post("/customers",  validateCustomer , insertCustomer);

export default customersRouter;