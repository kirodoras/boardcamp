import express from "express";
import {
  listRentals,
  insertRental,
} from "../controllers/rentals.controller.js";

import {
  validateRental,
  checkCustomerExistsByBody,
  checkGameExistsByBody,
  checkGameAvailabity,
} from "../middlewares/rental.middleware.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post(
  "/rentals",
  validateRental,
  checkCustomerExistsByBody,
  checkGameExistsByBody,
  checkGameAvailabity,
  insertRental
);
export default rentalsRouter;
