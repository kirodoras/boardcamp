import express from "express";
import {
  listRentals,
  insertRental,
} from "../controllers/rentals.controller.js";

import {
  validateRental,
  checkCustomerExistsByBody,
} from "../middlewares/rental.middleware.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post(
  "/rentals",
  validateRental,
  checkCustomerExistsByBody,
  insertRental
);
export default rentalsRouter;
