import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";

export const authRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
	ssl: {
		rejectUnauthorized: false
	}
})

authRouter.post('/login', async (req, res) => {
	try {
		const user = req.body.requestBody;
		const client = await pool.connect();
		const queryString = `SELECT * FROM admin WHERE email = \'${user.email}\' AND password = \'${user.password}\'`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send(result.rows[0]);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})
