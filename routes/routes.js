import express from 'express';
import connection from '../databases/postgres.js';

const router = express.Router();
router.get(('/test'), async (req, res) => {
    const test = await connection.query('SELECT * FROM customers');
    res.send(test.rows);
});

export default router;