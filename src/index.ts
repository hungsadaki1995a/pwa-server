import { otherServiceRouter } from './router/other-service.router';
/**
 * Required External Modules
 */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { authRouter } from 'router/auth.router';
import { serviceRouter } from 'router/services.router';
import multer from 'multer';
import path from 'path';
import serveIndex from 'serve-index';
import { carouselRouter } from 'router/carousel.router';

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
});

//will be using this for uplading
const upload = multer({ storage: storage });

const app = express();
app.use(cors());

// app.use( bodyParser.urlencoded( { extended: false } ) );

// app.use( bodyParser.json() )
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/ftp', express.static('public'), serveIndex('public', { 'icons': true }));

// app.use(fileUpload());

const port = process.env.PORT || 3600;
const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});


app.use('/auth', authRouter);
app.use('/services', serviceRouter);
app.use('/other-services', otherServiceRouter);
app.use('/carousel', carouselRouter);

app.post('/file-upload', upload.single('upload'), function (req, res) {
	let fileFullPath = '';
	if (req.file) {
		fileFullPath = req.protocol + '://' + req.get('host') + req.file.path.replace('public','')
	}
	return res.send({url: fileFullPath});
})


/**
 * Webpack HMR Activation => For DEV on local
 */
type ModuleId = string | number;

interface WebpackHotModule {
	hot?: {
		data: any;
		accept(
			dependencies: string[],
			callback?: (updatedDependencies: ModuleId[]) => void,
		): void;
		accept(dependency: string, callback?: () => void): void;
		accept(errHandler?: (err: Error) => void): void;
		dispose(callback: (data: any) => void): void;
	};
}

// @ts-ignore
declare const module: WebpackHotModule;

if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => server.close());
}
