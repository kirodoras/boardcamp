import connection from "../databases/postgres.js";

export async function listGames(req, res) {
  const { name } = req.query;
  const queryName = name ? `WHERE games.name ILIKE '${name}%'` : "";

  try {
    const { rows: games } = await connection.query(
      `SELECT games.*, categories.name AS "categoryName" 
      FROM games 
      JOIN categories 
      ON games."categoryId" = categories.id 
      ${queryName}`
    );
    res.send(games);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  console.log(req.body);

  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
