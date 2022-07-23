import connection from "../databases/postgres.js";

export async function listCustomers(req, res) {
  try {
    const { cpf } = req.query;
    const queryCpf = cpf ? `WHERE customers.cpf LIKE '${cpf}%'` : "";
    const { rows: customers } = await connection.query(
      `SELECT * FROM customers ${queryCpf}`
    );
    res.send(customers);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function getCustomer(req, res) {
  try {
    const { id } = req.params;
    const { rows: customer } = await connection.query(
      `SELECT * FROM customers WHERE customers.id = $1`,
      [id]
    );
    res.send(customer);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
