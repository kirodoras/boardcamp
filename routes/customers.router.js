import express from "express";
import { listCustomers } from "../controllers/customers.controller.js";
const customersRouter = express.Router();

customersRouter.get("/customers", listCustomers);

export default customersRouter;