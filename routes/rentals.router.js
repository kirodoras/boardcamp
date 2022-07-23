import express from "express";
import {
  listRentals,
  insertRental,
  finishRental,
  deleteRental,
} from "../controllers/rentals.controller.js";

import {
  validateRental,
  checkCustomerExistsByBody,
  checkGameExistsByBody,
  checkGameAvailabity,
  checkRentalExists,
  checkRentalAvailability,
  checkRentalFinish
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
rentalsRouter.delete(
  "/rentals/:id",
  checkRentalExists,
  checkRentalFinish,
  deleteRental
);

export default rentalsRouter;
