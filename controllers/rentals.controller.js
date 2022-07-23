import connection from "../databases/postgres.js";
import dayjs from "dayjs";

export async function listRentals(req, res) {
  const { customerId, gameId } = req.query;
  let query = "";
  if (customerId && gameId) {
    query = `WHERE rentals."customerId" = ${customerId} AND rentals."gameId" = ${gameId}`;
  } else if (customerId) {
    query = `WHERE rentals."customerId" = ${customerId}`;
  } else if (gameId) {
    query = `WHERE rentals."gameId" = ${gameId}`;
  }

  try {
    const { rows: rentals } = await connection.query(
      `SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
      FROM rentals
      JOIN customers
      ON rentals."customerId" = customers.id
      JOIN games
      ON rentals."gameId" = games.id
      JOIN categories
      ON games."categoryId" = categories.id
      ${query}`
    );
    const rentalsJoin = rentals.map((rental) => {
      return {
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
          id: rental.customerId,
          name: rental.customerName,
        },
        game: {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        },
      };
    });
    res.send(rentalsJoin);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function insertRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    const { rows: game } = await connection.query(
      `SELECT * FROM games WHERE id = ${gameId}`
    );
    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = game[0].pricePerDay * daysRented;
    const returnDate = null;
    const delayFee = null;

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function finishRental(req, res) {
  try {
    const { id } = req.params;
    const { rows: rental } = await connection.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [id]
    );

    const { rows: game } = await connection.query(
      `SELECT * FROM games WHERE id = $1`,
      [rental[0].gameId]
    );

    const returnDate = dayjs().format("YYYY-MM-DD");
    const daysRentedTotal = dayjs(returnDate).diff(
      dayjs(rental[0].rentDate),
      "day"
    );
    const delayFee =
      daysRentedTotal >= rental[0].daysRented
        ? (daysRentedTotal - rental[0].daysRented) * game[0].pricePerDay
        : 0;

    await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
