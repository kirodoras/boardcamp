import { rentalSchema } from "../schemas/rental.schema.js";

export async function validateRental(req, res, next) {
  const { error } = rentalSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  next();
}
