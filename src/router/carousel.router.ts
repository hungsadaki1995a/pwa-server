import express from "express";
import { Pool } from "pg";
import { constants } from "http2";

export const carouselRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
	ssl: {
		rejectUnauthorized: false
	}
})

carouselRouter.get('/', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM carousel ORDER BY "order" ASC');
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

carouselRouter.post('/', async (req, res) => {
	try {
		const carouselRequest = req.body;
		const client = await pool.connect();
		const maxOrderResult = await client.query('SELECT MAX("order") FROM carousel');
		let maxOrder = 0;
		if (maxOrderResult.rows.length > 0) {
			maxOrder = maxOrderResult.rows[0].max + 1;
		}
		const queryString = `INSERT INTO carousel(image_url, "order") values(\'${carouselRequest.image_url}\', ${maxOrder})`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({ result });
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

carouselRouter.post('/order-update', async (req, res) => {
	try {
		const carouselList: Array<any> = req.body.carouselList;
		const idListString = carouselList.map(item => { return item.id }).join(',');
		let conditionUpdateList = '';
		carouselList.map(item => conditionUpdateList += ` WHEN ${item.id} THEN ${item.order}`);
		const client = await pool.connect();
		const queryString = `UPDATE carousel SET "order" = CASE id ${conditionUpdateList} ELSE "order" END WHERE id IN(${idListString})`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({result});
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

carouselRouter.delete('/:id', async (req, res) => {
	try {
		const serviceId = req.params.id;
		const client = await pool.connect();
		const queryString = `DELETE FROM carousel WHERE id = ${serviceId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send('success');
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})