import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";

export const albumRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ohzdvanjcvhgww:f2b54928cdbd5258f3a4e05c7c340d1c8d13a55186cab1a806bd0b089bca98de@ec2-3-214-3-162.compute-1.amazonaws.com:5432/d9dlljd2n92mbj',
	ssl: {
		rejectUnauthorized: false
	}
})

albumRouter.get('/', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM album_category ORDER BY id DESC');
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

albumRouter.post('/', async (req, res) => {
	try {
		const body = req.body;
		const client = await pool.connect();
		const queryString = `INSERT INTO album_category(name) values(\'${body.name}\')`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({});
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})
