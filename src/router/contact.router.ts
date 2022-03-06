import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";

export const contactRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
	ssl: {
		rejectUnauthorized: false
	}
})

contactRouter.get('/', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM contact');
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

contactRouter.post('/', async (req, res) => {
	try {
		const introduceRequest = req.body;
		const client = await pool.connect();
		const createdAt = new Date().getTime();
		let queryString = `INSERT INTO contact(name, phone_number, address, email, content, created_time) values(\'${introduceRequest.name}\', \'${introduceRequest.phone_number}\', \'${introduceRequest.address}\', \'${introduceRequest.email}\', \'${introduceRequest.content}\', \'${createdAt}\')`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({ result });
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})