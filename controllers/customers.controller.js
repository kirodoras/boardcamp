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

export async function insertCustomer(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
