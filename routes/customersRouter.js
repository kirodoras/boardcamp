import express from "express";
import {
  listCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
} from "../controllers/customersController.js";
import {
  checkCustomerExists,
  validateCustomer,
  checkCustomerExistsByCpf,
} from "../middlewares/customersMiddleware.js";

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
  checkCustomerExists,
  updateCustomer
);

export default customersRouter;
