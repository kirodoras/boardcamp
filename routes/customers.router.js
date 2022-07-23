import express from "express";
import {
  listCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
} from "../controllers/customers.controller.js";
import {
  checkCustomerExists,
  validateCustomer,
  checkCustomerExistsByCpf,
} from "../middlewares/customers.middleware.js";

const customersRouter = express.Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id", checkCustomerExists, getCustomer);
customersRouter.post(
  "/customers",
  validateCustomer,
  checkCustomerExistsByCpf,
  insertCustomer
);
customersRouter.put(
  "/customers/:id",
  validateCustomer,
  checkCustomerExistsByCpf,
  updateCustomer
);

export default customersRouter;
