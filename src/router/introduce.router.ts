import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";
import fs from 'fs';
import path from 'path';

export const introduceRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
	ssl: {
		rejectUnauthorized: false
	}
})

introduceRouter.get('/', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM introduce');
        if(result.rows.length > 0) {
            res.status(constants.HTTP_STATUS_OK).send(result.rows[0]);
        } else {
            res.status(constants.HTTP_STATUS_OK).send(null);
        }
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

introduceRouter.post('/', async (req, res) => {
	try {
		const introduceRequest = req.body;
		const client = await pool.connect();
        let queryString = '';
        if (introduceRequest.id) {
            queryString = `UPDATE introduce SET content = \'${introduceRequest.content}\' WHERE id = ${introduceRequest.id}`;
        } else {
            queryString = `INSERT INTO introduce(content) values(\'${introduceRequest.content}\')`;
        }
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({result});
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})