import connection from "../databases/postgres.js";
import { rentalSchema } from "../schemas/rental.schema.js";

export async function validateRental(req, res, next) {
  const { error } = rentalSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  next();
}

export async function checkCustomerExistsByBody(req, res, next) {
  try {
    const { customerId } = req.body;
    const { rows: customer } = await connection.query(
      `SELECT * FROM customers WHERE customers.id = $1`,
      [customerId]
    );
    if (!customer.length) {
      res.status(400).send("Customer not found");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function checkGameExistsByBody(req, res, next) {
  try {
    const { gameId } = req.body;
    const { rows: game } = await connection.query(
      `SELECT * FROM games WHERE games.id = $1`,
      [gameId]
    );
    if (!game.length) {
      res.status(400).send("Game not found");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
