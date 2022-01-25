import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";

export const serviceRouter = express.Router();

const pool = new Pool({
	connectionString: 'postgres://ajoxgdsnxjmihp:2e26b14ceefdabcf3b4e047fedf9fa0c74286bf019c7484a17eae76e3179eed1@ec2-34-206-220-95.compute-1.amazonaws.com:5432/dbiv4s763p8fan',
	ssl: {
		rejectUnauthorized: false
	}
})

serviceRouter.get('/', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM services ORDER BY id DESC');
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.post('/', async (req, res) => {
	try {
		const serviceRequest = req.body;
		console.log(serviceRequest);
		const client = await pool.connect();
		const createdAt = new Date().getTime();
		const queryString = `INSERT INTO services(title, content, primary_image_url, created_time) values(\'${serviceRequest.title}\', \'${serviceRequest.content}\', \'${serviceRequest.primary_image_url}\', \'${createdAt}\')`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({result});
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.get('/:id', async (req, res) => {
	try {
		const albumId = req.params.id;
		const client = await pool.connect();
		const queryString = `SELECT * FROM album_category WHERE id = ${albumId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send(result.rows[0]);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.get('/:id/images', async (req, res) => {
	try {
		const albumId = req.params.id;
		const client = await pool.connect();
		const queryString = `SELECT * FROM album_images WHERE album_id = ${albumId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.post('/:id/upload', async (req, res) => {
	try {
		const files = req?.files?.image;
		const albumId = Number(req.params.id);
		const values = [];
		let queryValue = '';
		if (Array.isArray(files)) {
			for (const file of files) {
				const value = `(${file.name}, ${file.data}, ${albumId})`;
				values.push(value);
			}
			queryValue = values.join(',');
		} else if (files){
			queryValue = `(\'${files.name}\', ${files.data}, ${albumId})`;
		}
		const client = await pool.connect();
		const queryString = `INSERT INTO album_images(image_name, image, album_id) values ${queryValue}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})
