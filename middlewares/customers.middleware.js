import connection from "../databases/postgres.js";

export async function checkCustomerExists(req, res, next) {
  try {
    const { id } = req.params;
    const { rows: customer } = await connection.query(
      `SELECT * FROM customers WHERE customers.id = $1`,
      [id]
    );
    if (!customer.length) {
      res.status(404).send("Customer not found");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}