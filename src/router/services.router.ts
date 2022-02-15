import express from 'express';
import { Pool } from 'pg';
import { constants } from "http2";
import fs from 'fs';
import path from 'path';

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
		const result = await client.query('SELECT * FROM services WHERE other_service_flg = false ORDER BY id DESC ;');
		res.status(constants.HTTP_STATUS_OK).send(result.rows);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.post('/', async (req, res) => {
	try {
		const serviceRequest = req.body;
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
		const serviceId = req.params.id;
		const client = await pool.connect();
		const queryString = `SELECT * FROM services WHERE id = ${serviceId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send(result.rows[0]);
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.delete('/:id', async (req, res) => {
	try {
		const serviceId = req.params.id;
		const client = await pool.connect();
		// const serviceGetQuery = `SELECT * FROM services WHERE id = ${serviceId}`;
		// const services = await client.query(serviceGetQuery);
		// const service = services.rows[0];
		// const servicePrimaryImageUrl = service.primary_image_url;
		// const fileName = servicePrimaryImageUrl.substring(servicePrimaryImageUrl.lastIndexOf('\\')+1);
		// fs.unlinkSync(path.join(__dirname, 'public/uploads/' + fileName));
		const queryString = `DELETE FROM services WHERE id = ${serviceId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send('success');
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}
})

serviceRouter.put('/:id', async (req, res) => {

	try {
		const serviceRequest = req.body;
		const serviceId = req.params.id;
		const client = await pool.connect();
		const createdAt = new Date().getTime();
		const queryString = `UPDATE services SET title = \'${serviceRequest.title}\', content = \'${serviceRequest.content}\', primary_image_url = \'${serviceRequest.primary_image_url}\' WHERE id = ${serviceId}`;
		const result = await client.query(queryString);
		res.status(constants.HTTP_STATUS_OK).send({result});
		client.release();
	} catch (e) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	}

	// try {
	// 	const files = req?.files?.image;
	// 	const albumId = Number(req.params.id);
	// 	const values = [];
	// 	let queryValue = '';
	// 	if (Array.isArray(files)) {
	// 		for (const file of files) {
	// 			const value = `(${file.name}, ${file.data}, ${albumId})`;
	// 			values.push(value);
	// 		}
	// 		queryValue = values.join(',');
	// 	} else if (files){
	// 		queryValue = `(\'${files.name}\', ${files.data}, ${albumId})`;
	// 	}
	// 	const client = await pool.connect();
	// 	const queryString = `INSERT INTO album_images(image_name, image, album_id) values ${queryValue}`;
	// 	const result = await client.query(queryString);
	// 	res.status(constants.HTTP_STATUS_OK).send(result.rows);
	// 	client.release();
	// } catch (e) {
	// 	res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e.message);
	// }
})
