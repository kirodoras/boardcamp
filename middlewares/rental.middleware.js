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

export async function checkGameAvailabity(req, res, next) {
  try {
    const { gameId } = req.body;
    const { rows: game } = await connection.query(
      `SELECT * FROM games WHERE games.id = $1`,
      [gameId]
    );
    const { rows: rentals } = await connection.query(
      `SELECT * FROM rentals WHERE rentals."gameId" = $1`,
      [gameId]
    );
    if (game[0].stockTotal <= rentals.length) {
      res.status(400).send("Game not available");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function checkRentalExists(req, res, next) {
  try {
    const { id } = req.params;
    const { rows: rental } = await connection.query(
      `SELECT * FROM rentals WHERE rentals.id = $1`,
      [id]
    );
    if (!rental.length) {
      res.status(404).send("Rental not found");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function checkRentalAvailability(req, res, next) {
  try {
    const { id } = req.params;
    const { rows: rental } = await connection.query(
      `SELECT * FROM rentals WHERE rentals.id = $1`,
      [id]
    );
    if (rental[0].returnDate != null) {
      res.status(400).send("Rental already returned");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function checkRentalFinish(req, res, next) {
  try {
    const { id } = req.params;
    const { rows: rental } = await connection.query(
      `SELECT * FROM rentals WHERE rentals.id = $1`,
      [id]
    );
    if (rental[0].returnDate == null) {
      res.status(400).send("Rental not finished");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
