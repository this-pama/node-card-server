import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import licence from '../controller/licence';
import request from '../controller/request';


let router = express();

// connect to db
initializeDb(db => {


  // api routes v1 (/v1)
  router.use('/licence', licence({ config, db }));
  router.use('/request', request({ config, db }));

});

export default router;
