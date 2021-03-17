/**
 * Required External Modules
 */
 import express from 'express';
 import cors from 'cors';
 
 const app = express();
 app.use(cors());

 app.use(express.json());

 const port = process.env.PORT || 3600;
 const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
 });

 app.get('/', function (req, res) {
         res.send({});
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
 