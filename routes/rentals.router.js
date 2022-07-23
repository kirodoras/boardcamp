import express from "express";
import {
  listRentals,
  insertRental,
  finishRental,
} from "../controllers/rentals.controller.js";

import {
  validateRental,
  checkCustomerExistsByBody,
  checkGameExistsByBody,
  checkGameAvailabity,
  checkRentalExists,
  checkRentalAvailability,
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
rentalsRouter.post(
  "/rentals/:id/return",
  checkRentalExists,
  checkRentalAvailability,
  finishRental
);

export default rentalsRouter;
