import connection from "../databases/postgres.js";

export async function listCategories(req, res) {
  const {rows: categories} = await connection.query("SELECT * FROM categories");
  res.send(categories);
}