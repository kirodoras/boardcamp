import connection from "../databases/postgres.js";

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
