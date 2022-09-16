import connection from "../databases/postgres.js";
import { customerSchema } from "../schemas/customersSchema.js";

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

export async function validateCustomer(req, res, next) {
  try {
    const { name, phone, cpf, birthday: bday } = req.body;
    const birthday = bday.substring(0, 10);
    const { error } = customerSchema.validate({ name, phone, cpf, birthday });
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function checkCustomerExistsByCpf(req, res, next) {
  try {
    const { cpf } = req.body;
    const { rows: customer } = await connection.query(
      `SELECT * FROM customers WHERE customers.cpf = $1`,
      [cpf]
    );
    if (customer.length) {
      res.status(409).send("Customer already exists");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
